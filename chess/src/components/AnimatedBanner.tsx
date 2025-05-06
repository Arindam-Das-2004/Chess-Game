import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const AnimatedBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if the banner has been dismissed before
    const bannerDismissed = localStorage.getItem('chess-banner-dismissed');
    if (bannerDismissed) {
      setIsVisible(false);
    }

    // Set loaded after a small delay to trigger animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('chess-banner-dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div
      className={`
        fixed top-16 left-0 right-0 z-50 transition-all duration-500 transform
        ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-sm border-b border-primary/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="font-medium text-foreground">
                <span className="hidden md:inline">🎉 New features available! </span>
                Try our new game modes and enhanced AI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-primary/20 hover:bg-primary/10"
              onClick={() => window.open('https://prod.spline.design/EiEuyLQT-Xm3fem0/scene.splinecode', '_blank')}
            >
              View 3D Model
            </Button>

            <Button
              size="icon"
              variant="ghost"
              onClick={handleDismiss}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-secondary/10 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBanner;
