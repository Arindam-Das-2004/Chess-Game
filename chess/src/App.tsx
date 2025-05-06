
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider";
import { AuthProvider, useAuth } from "./providers/AuthProvider";
import { SocketProvider } from "./providers/SocketProvider";
import { Suspense, useEffect, useState } from "react";
import { dynamicImport, preloadComponent } from "@/utils/dynamicImport";

// Import auth-related components
const ResetPassword = dynamicImport(() => import("./pages/ResetPassword"));
const AuthCallback = dynamicImport(() => import("./pages/AuthCallback"));

// Eagerly loaded components
import NotFound from "./pages/NotFound";
import TestPage from "./pages/TestPage";

// Lazy loaded components with retry logic
const Index = dynamicImport(() => import("./pages/IndexNew"));
const PlayAI = dynamicImport(() => import("./pages/PlayAI"));
const PlayLocal = dynamicImport(() => import("./pages/PlayLocal"));
const PlayOnline = dynamicImport(() => import("./pages/PlayOnline"));
const Practice = dynamicImport(() => import("./pages/Practice"));
const GamePlanSelection = dynamicImport(() => import("./pages/GamePlanSelection"));
const Login = dynamicImport(() => import("./pages/Login"));
const Profile = dynamicImport(() => import("./pages/Profile"));
const Settings = dynamicImport(() => import("./pages/Settings"));
const Community = dynamicImport(() => import("./pages/Community"));
const LocalMultiplayerGame = dynamicImport(() => import("./pages/LocalMultiplayerGame"));
const Learn = dynamicImport(() => import("./pages/Learn"));
const LearnMore = dynamicImport(() => import("./pages/LearnMore"));

// New feature pages
const MoveSuggestions = dynamicImport(() => import("./pages/MoveSuggestions"));
const GameReplays = dynamicImport(() => import("./pages/GameReplays"));
const CustomBoards = dynamicImport(() => import("./pages/CustomBoards"));
const TrophyRoom = dynamicImport(() => import("./pages/TrophyRoom"));
const SkillRating = dynamicImport(() => import("./pages/SkillRating"));
const DailyMissions = dynamicImport(() => import("./pages/DailyMissions"));
const NextTournament = dynamicImport(() => import("./pages/NextTournament"));

// Preloader component to preload critical assets
const Preloader = () => {
  useEffect(() => {
    // Preload the home page
    preloadComponent(() => import("./pages/IndexNew"));

    // Preload frequently accessed pages based on user behavior
    setTimeout(() => {
      preloadComponent(() => import("./pages/PlayAI"));
      preloadComponent(() => import("./pages/GamePlanSelection"));
    }, 2000); // 2 second delay
  }, []);

  return null;
};

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="flex flex-col items-center">
      <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p className="text-lg font-medium">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  // Error boundary state
  const [hasError, setHasError] = useState(false);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  // Set up error handling
  useEffect(() => {
    // Global error handler
    const handleGlobalError = (event: ErrorEvent) => {
      console.error("Global error:", event.error);
      setHasError(true);
      setErrorInfo(event.error?.message || "Unknown error occurred");
      event.preventDefault();
    };

    // Add global error listener
    window.addEventListener('error', handleGlobalError);

    // Clean up
    return () => {
      window.removeEventListener('error', handleGlobalError);
    };
  }, []);

  // Reset error state
  const resetError = () => {
    setHasError(false);
    setErrorInfo(null);
  };

  // If there's an error, show error screen
  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
        <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg border border-border">
          <h1 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-4">
            We're sorry, but there was an error loading the application.
          </p>
          {errorInfo && (
            <div className="bg-muted p-3 rounded-md mb-4 overflow-auto max-h-40">
              <code className="text-sm">{errorInfo}</code>
            </div>
          )}
          <Button onClick={resetError} className="w-full">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
      return <LoadingFallback />;
    }

    if (!user) {
      return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <SocketProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {/* Preload critical components */}
              <Preloader />
              <BrowserRouter>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    {/* Auth routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/auth/callback" element={<AuthCallback />} />
                    {/* Game routes */}
                    <Route path="/play/ai" element={<PlayAI />} />
                    <Route path="/play/local" element={<PlayLocal />} />
                    <Route path="/play/local/game" element={<LocalMultiplayerGame />} />
                    <Route path="/play/online" element={
                      <ProtectedRoute>
                        <PlayOnline />
                      </ProtectedRoute>
                    } />
                    <Route path="/play/practice" element={<Practice />} />
                    <Route path="/play" element={<GamePlanSelection />} />
                    <Route path="/play/tournament" element={
                      <ProtectedRoute>
                        <NextTournament />
                      </ProtectedRoute>
                    } />
                    {/* User routes */}
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } />
                    <Route path="/community" element={<Community />} />
                    {/* Learn routes */}
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/learn/more" element={<LearnMore />} />

                    {/* Feature routes */}
                    <Route path="/features/move-suggestions" element={<MoveSuggestions />} />
                    <Route path="/features/game-replays" element={<GameReplays />} />
                    <Route path="/features/custom-boards" element={<CustomBoards />} />
                    <Route path="/features/trophy-room" element={<TrophyRoom />} />
                    <Route path="/features/skill-rating" element={<SkillRating />} />
                    <Route path="/features/daily-missions" element={<DailyMissions />} />

                    {/* Test route */}
                    <Route path="/test" element={<TestPage />} />

                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </BrowserRouter>
            </TooltipProvider>
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;

