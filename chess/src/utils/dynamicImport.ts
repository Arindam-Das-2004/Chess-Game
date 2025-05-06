import { lazy, ComponentType } from 'react';

/**
 * Utility function to dynamically import components with retry logic
 * @param importFn - The import function to call
 * @param retries - Number of retries if import fails
 * @returns A lazy-loaded component
 */
export function dynamicImport<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  retries: number = 3
): React.LazyExoticComponent<T> {
  return lazy(() => {
    let count = 0;
    
    const tryImport = async (): Promise<{ default: T }> => {
      try {
        return await importFn();
      } catch (error) {
        if (count < retries) {
          count++;
          console.warn(`Failed to load component, retrying (${count}/${retries})...`);
          return new Promise((resolve) => {
            // Exponential backoff for retries
            const delay = Math.min(1000 * 2 ** count, 10000);
            setTimeout(() => resolve(tryImport()), delay);
          });
        }
        console.error('Failed to load component after multiple retries', error);
        throw error;
      }
    };
    
    return tryImport();
  });
}

/**
 * Utility function to preload a component
 * @param importFn - The import function to call
 */
export function preloadComponent(importFn: () => Promise<any>): void {
  importFn().catch(error => {
    console.warn('Failed to preload component', error);
  });
}

/**
 * Utility function to preload an image
 * @param src - The image source URL
 */
export function preloadImage(src: string): void {
  const img = new Image();
  img.src = src;
}

/**
 * Utility function to preload multiple resources
 * @param resources - Array of resources to preload
 * @param type - Type of resources ('image' or 'component')
 */
export function preloadResources(
  resources: string[] | (() => Promise<any>)[],
  type: 'image' | 'component' = 'image'
): void {
  if (type === 'image') {
    (resources as string[]).forEach(preloadImage);
  } else {
    (resources as (() => Promise<any>)[]).forEach(preloadComponent);
  }
}
