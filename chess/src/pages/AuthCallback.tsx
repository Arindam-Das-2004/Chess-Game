import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '@/config/SupabaseClient';
import { toast } from 'sonner';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        console.log('Auth callback triggered');
        setIsProcessing(true);

        // With PKCE flow, Supabase handles the callback automatically
        // We just need to check if the session was established
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setError(sessionError.message);
          toast.error('Authentication failed', {
            description: sessionError.message,
          });
          setTimeout(() => navigate('/login'), 2000);
          return;
        }

        if (!session) {
          // Check URL for error parameters
          const params = new URLSearchParams(location.search);
          const errorDescription = params.get('error_description') || params.get('error');

          if (errorDescription) {
            setError(errorDescription);
            toast.error('Authentication failed', {
              description: errorDescription,
            });
            setTimeout(() => navigate('/login'), 2000);
            return;
          }

          // If no session and no error, try to exchange the code for a session
          // This is a fallback for the implicit flow
          console.log('No session found, checking for tokens in URL');

          // Check hash fragment for tokens (implicit flow)
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');

          if (accessToken) {
            console.log('Found access token, setting session');
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken || '',
            });

            if (error) {
              console.error('Error setting session:', error);
              setError(error.message);
              toast.error('Authentication failed', {
                description: error.message,
              });
              setTimeout(() => navigate('/login'), 2000);
              return;
            }

            if (data.session) {
              // Success - redirect to home page
              toast.success('Authentication successful!');
              navigate('/');
              return;
            }
          }

          // If we get here, something went wrong
          console.error('No session established and no tokens found');
          setError('Authentication failed. Please try again.');
          toast.error('Authentication failed', {
            description: 'No session was established. Please try again.',
          });
          setTimeout(() => navigate('/login'), 2000);
        } else {
          // Success - we have a session
          console.log('Session established successfully');
          toast.success('Authentication successful!');
          navigate('/');
        }
      } catch (err: any) {
        console.error('Error in auth callback:', err);
        setError(err?.message || 'An unexpected error occurred');
        toast.error('Authentication failed', {
          description: err?.message || 'An unexpected error occurred',
        });
        setTimeout(() => navigate('/login'), 2000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4">
          <div className="h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto"></div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Completing authentication...</h1>
        <p className="text-muted-foreground">
          {error ? error : "Please wait while we complete your authentication."}
        </p>
      </div>
    </div>
  );
};

export default AuthCallback;
