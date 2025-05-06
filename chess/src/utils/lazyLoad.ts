import { useEffect, useState } from 'react';

/**
 * Custom hook for lazy loading images
 * @param src - The image source URL
 * @param placeholder - Optional placeholder image URL
 * @returns The image source to use (placeholder until loaded)
 */
export const useLazyImage = (src: string, placeholder: string = ''): string => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Create a new image object
    const img = new Image();
    
    // Set up load event handler
    img.onload = () => {
      setImageSrc(src);
      setImageLoaded(true);
    };
    
    // Set the source to trigger loading
    img.src = src;
    
    // Clean up
    return () => {
      img.onload = null;
    };
  }, [src]);

  return imageSrc;
};

/**
 * Utility function to determine if an image should be lazy loaded
 * @param priority - Whether the image is high priority
 * @param threshold - Viewport threshold for loading (0-1)
 * @returns Props for the image element
 */
export const getLazyImageProps = (priority: boolean = false, threshold: number = 0.1) => {
  if (priority) {
    // High priority images load immediately
    return {
      loading: 'eager' as const,
      fetchPriority: 'high' as const,
    };
  }
  
  // Low priority images are lazy loaded
  return {
    loading: 'lazy' as const,
    fetchPriority: 'auto' as const,
    decoding: 'async' as const,
    // Use a data attribute to track when the image should load
    'data-lazy-threshold': threshold.toString(),
  };
};

/**
 * Utility function to get a placeholder image URL
 * @param width - Width of the placeholder
 * @param height - Height of the placeholder
 * @param text - Optional text to display
 * @returns A data URL for a placeholder image
 */
export const getPlaceholderImage = (width: number, height: number, text: string = ''): string => {
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0" />
      <text x="50%" y="50%" font-family="sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle" fill="#888">
        ${text || `${width}x${height}`}
      </text>
    </svg>
  `;
  
  // Convert to a data URL
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.trim())}`;
};
