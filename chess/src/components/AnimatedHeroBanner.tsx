import React, { useEffect, useState, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedHeroBannerProps {
  className?: string;
}

const AnimatedHeroBanner: React.FC<AnimatedHeroBannerProps> = ({
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Handle successful load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle error
  const handleError = () => {
    setIsError(true);
    console.error('Failed to load Spline model');
  };

  return (
    <div
      ref={setRefs}
      className={`relative w-full h-[50vh] md:h-[70vh] overflow-hidden ${className}`}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background/80 to-background"></div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-20 h-20 rounded-full bg-primary/10"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{ top: '20%', left: '10%' }}
        />
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-secondary/10"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          style={{ top: '60%', right: '15%' }}
        />
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-primary/5"
          animate={{
            x: [0, 40, 0],
            y: [0, 40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
          style={{ bottom: '20%', left: '20%' }}
        />
      </div>

      {/* Loading indicator - shown before model loads */}
      {!isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
            <p className="text-lg font-medium">Loading 3D Chess Experience...</p>
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-10">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md text-center">
            <p className="text-lg font-medium text-destructive mb-2">3D model failed to load</p>
            <p className="text-muted-foreground">Please check your internet connection and try refreshing the page.</p>
          </div>
        </div>
      )}

      {/* 3D Model - only loaded when in view and after delay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          scale,
          opacity,
          y: yOffset,
          rotateY
        }}
      >
        {shouldLoad && (
          <Suspense fallback={
            <div className="flex items-center justify-center w-full h-full">
              <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          }>
            <Spline
              scene="https://prod.spline.design/EiEuyLQT-Xm3fem0/scene.splinecode"
              onLoad={handleLoad}
              onError={handleError}
              className="w-full h-full"
            />
          </Suspense>
        )}
      </motion.div>

      {/* No overlay text - will be provided by parent component */}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedHeroBanner;
