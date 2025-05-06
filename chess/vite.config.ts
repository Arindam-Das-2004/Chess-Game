import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true, // Listen on all addresses, including network
    port: 9000,
    open: true,
    strictPort: true, // Force the specified port
    hmr: {
      overlay: true,
    },
    // Optimize server performance
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  plugins: [
    react(),
    // Split chunks for better caching
    splitVendorChunkPlugin(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Optimize build
  build: {
    // Generate sourcemaps for production build
    sourcemap: mode === 'development',
    // Minify output
    minify: 'terser',
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Rollup options
    rollupOptions: {
      output: {
        // Chunk files
        manualChunks: {
          // Split vendor chunks
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'framer-motion',
            '@splinetool/react-spline',
          ],
          // UI components
          ui: [
            '@/components/ui',
          ],
        },
      },
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
    ],
    // Exclude large dependencies that are lazy loaded
    exclude: [
      '@splinetool/react-spline',
      '@splinetool/runtime',
    ],
  },
}));
