import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useLazyImage, getPlaceholderImage, getLazyImageProps } from '@/utils/lazyLoad';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholderSrc?: string;
  priority?: boolean;
  threshold?: number;
  loadDelay?: number;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderSrc,
  priority = false,
  threshold = 0.1,
  loadDelay = 0,
  ...props
}) => {
  const [shouldLoad, setShouldLoad] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Generate placeholder if not provided
  const placeholder = placeholderSrc || (width && height 
    ? getPlaceholderImage(width, height) 
    : getPlaceholderImage(300, 200));
  
  // Use intersection observer to detect when component is in view
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
  });
  
  // Get the image source (placeholder until loaded)
  const imageSrc = shouldLoad ? useLazyImage(src, placeholder) : placeholder;
  
  // Load the image when in view or after delay
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
  
  // Get lazy loading props
  const lazyProps = getLazyImageProps(priority, threshold);
  
  // Handle image load event
  const handleLoad = () => {
    setIsLoaded(true);
  };
  
  return (
    <div 
      ref={ref} 
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}
    >
      {/* Placeholder/loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted/20 animate-pulse"></div>
      )}
      
      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        onLoad={handleLoad}
        className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        {...lazyProps}
        {...props}
      />
    </div>
  );
};

export default LazyImage;
