import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/config/SupabaseClient';
import { Session, User, Provider } from '@supabase/supabase-js';
import { toast } from 'sonner';

export type UserProfile = {
  id: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  email: string;
  rating: number;
  games_played: number;
  wins: number;
  losses: number;
  draws: number;
  created_at: string;
  last_seen: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signUp: (email: string, password: string, username: string, fullName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signInWithSocial: (provider: Provider) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');

        // Get initial session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error getting session:', sessionError);
          setIsLoading(false);
          return;
        }

        const session = sessionData.session;
        console.log('Initial session:', session ? 'Found' : 'None');

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setIsLoading(false);
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log('Auth state change:', event, session ? 'Session exists' : 'No session');

          setSession(session);
          setUser(session?.user ?? null);

          if (session?.user) {
            await fetchProfile(session.user.id);

            // If this is a new sign-in, show a welcome message
            if (event === 'SIGNED_IN') {
              toast.success(`Welcome back!`);
            }
          } else {
            setProfile(null);
            setIsLoading(false);

            // If this is a sign-out, show a goodbye message
            if (event === 'SIGNED_OUT') {
              toast.success('You have been signed out');
            }
          }
        });

        return () => {
          console.log('Cleaning up auth subscription');
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      setIsLoading(true);
      console.log('Fetching profile for user:', userId);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);

        // If the profile doesn't exist, create one
        if (error.code === 'PGRST116') { // PostgreSQL error for "no rows returned"
          console.log('Profile not found, creating a new one');

          if (user?.email) {
            // Generate a username from email
            const username = user.email.split('@')[0] + Math.floor(Math.random() * 1000);

            // Create a new profile
            const { error: createError } = await supabase.from('profiles').insert([
              {
                id: userId,
                username,
                full_name: user.user_metadata?.full_name || '',
                email: user.email,
                rating: 1200, // Default rating
                games_played: 0,
                wins: 0,
                losses: 0,
                draws: 0,
                created_at: new Date().toISOString(),
                last_seen: new Date().toISOString(),
              },
            ]);

            if (createError) {
              console.error('Error creating profile:', createError);
            } else {
              // Fetch the newly created profile
              const { data: newProfile, error: fetchError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

              if (fetchError) {
                console.error('Error fetching new profile:', fetchError);
              } else if (newProfile) {
                console.log('New profile created and fetched successfully');
                setProfile(newProfile as UserProfile);
              }
            }
          }
        }
      } else if (data) {
        console.log('Profile fetched successfully:', data.username);
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, username: string, fullName?: string) => {
    try {
      console.log('Signing up user:', email, username);

      // First, check if the email is already registered
      const { data: existingUsers, error: checkError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .limit(1);

      if (checkError) {
        console.error('Error checking existing user:', checkError);
      } else if (existingUsers && existingUsers.length > 0) {
        return {
          error: {
            message: 'This email is already registered. Please try logging in instead.',
            name: 'EmailAlreadyExists'
          }
        };
      }

      // Proceed with signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            full_name: fullName || '',
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error('Supabase signup error:', error);
        return { error };
      }

      if (data.user) {
        console.log('User created successfully:', data.user.id);

        // Create a profile record
        const { error: profileError } = await supabase.from('profiles').insert([
          {
            id: data.user.id,
            username,
            full_name: fullName || '',
            email,
            rating: 1200, // Default rating
            games_played: 0,
            wins: 0,
            losses: 0,
            draws: 0,
            created_at: new Date().toISOString(),
            last_seen: new Date().toISOString(),
          },
        ]);

        if (profileError) {
          console.error('Error creating profile:', profileError);

          // Try to delete the auth user if profile creation fails
          try {
            // Note: In a real app, you'd need admin privileges to delete users
            // This is just for demonstration purposes
            console.error('Profile creation failed, but auth user was created');
          } catch (deleteError) {
            console.error('Error cleaning up auth user after profile creation failure:', deleteError);
          }

          return { error: profileError };
        }

        toast.success('Account created successfully! Please check your email for verification.');
      } else {
        console.error('User object missing from signup response');
        return {
          error: {
            message: 'Failed to create user account. Please try again.',
            name: 'SignupFailed'
          }
        };
      }

      return { error: null };
    } catch (error: any) {
      console.error('Unexpected error during sign up:', error);
      return {
        error: {
          message: error?.message || 'An unexpected error occurred during signup',
          name: 'SignupError'
        }
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting to sign in with email:', email);

      // Validate inputs
      if (!email || !password) {
        return {
          error: {
            message: 'Email and password are required',
            name: 'ValidationError'
          }
        };
      }

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);

        // Don't show toast here - let the component handle it
        return { error };
      }

      if (data.user && data.session) {
        console.log('Login successful for user:', data.user.id);

        // Update last_seen in profile
        try {
          await supabase
            .from('profiles')
            .update({ last_seen: new Date().toISOString() })
            .eq('id', data.user.id);
        } catch (updateError) {
          console.error('Error updating last_seen:', updateError);
          // Non-critical error, don't return it
        }

        // Don't show toast here - let the component handle it
        return { error: null };
      } else {
        console.error('Login succeeded but user or session is missing');
        return {
          error: {
            message: 'Authentication failed. Please try again.',
            name: 'AuthenticationError'
          }
        };
      }
    } catch (error: any) {
      console.error('Unexpected error during sign in:', error);
      return {
        error: {
          message: error?.message || 'An unexpected error occurred during login',
          name: 'LoginError'
        }
      };
    }
  };

  const signInWithSocial = async (provider: Provider) => {
    try {
      // Log the attempt for debugging
      console.log(`Attempting to sign in with ${provider}`);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // Add scopes for each provider
          scopes: provider === 'github'
            ? 'user:email'
            : provider === 'google'
              ? 'email profile'
              : 'email',
          // Add query params for additional configuration
          queryParams:
            provider === 'google'
              ? { prompt: 'select_account' }
              : undefined,
        },
      });

      if (error) {
        console.error(`Error signing in with ${provider}:`, error);
        toast.error('Social login failed', {
          description: error.message,
        });
        return { error };
      }

      // If we get here without an error, the user is being redirected to the provider
      console.log(`Redirecting to ${provider} for authentication`);
      return { error: null };
    } catch (error: any) {
      console.error(`Error during ${provider} sign in:`, error);
      toast.error('Social login failed', {
        description: error?.message || 'An unexpected error occurred. Please try again.',
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.info('Logged out successfully');
    } catch (error) {
      console.error('Error during sign out:', error);
      toast.error('Error signing out');
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      if (!user) {
        return { error: new Error('User not authenticated') };
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (!error && profile) {
        setProfile({ ...profile, ...updates });
        toast.success('Profile updated successfully!');
      }

      return { error };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (!error) {
        toast.success('Password reset email sent. Please check your inbox.');
      }

      return { error };
    } catch (error) {
      console.error('Error during password reset:', error);
      return { error };
    }
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signUp,
    signIn,
    signInWithSocial,
    signOut,
    updateProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
