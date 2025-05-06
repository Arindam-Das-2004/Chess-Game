import React, { useEffect, useState, useRef, lazy, Suspense } from 'react';
import { useInView } from 'react-intersection-observer';

// Lazy load the Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineChessModelProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  loadDelay?: number; // Delay in ms before loading the 3D model
  priority?: boolean; // Whether to load the model with high priority
}

const SplineChessModel: React.FC<SplineChessModelProps> = ({
  className = '',
  size = 'medium',
  loadDelay = 0,
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Use intersection observer to detect when component is in view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Size mapping
  const sizeClasses = {
    small: 'h-[120px] w-[120px]',
    medium: 'h-[200px] w-[200px]',
    large: 'h-[300px] w-[300px]',
  };

  // Handle successful load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle error
  const handleError = () => {
    setIsError(true);
    console.error('Failed to load Spline model');
  };

  // Load the model when in view or after delay
  useEffect(() => {
    if (inView && !shouldLoad) {
      if (loadDelay > 0) {
        timerRef.current = setTimeout(() => {
          setShouldLoad(true);
        }, loadDelay);
      } else {
        setShouldLoad(true);
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inView, loadDelay, shouldLoad]);

  return (
    <div ref={ref} className={`relative ${sizeClasses[size]} ${className}`}>
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-md">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}

      {isError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-md">
          <p className="text-xs text-muted-foreground">3D model failed to load</p>
        </div>
      ) : shouldLoad && (
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 rounded-md">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        }>
          <Spline
            scene="https://prod.spline.design/EiEuyLQT-Xm3fem0/scene.splinecode"
            onLoad={handleLoad}
            onError={handleError}
            className={`w-full h-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          />
        </Suspense>
      )}
    </div>
  );
};

export default SplineChessModel;
