import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Production optimizations for Phase 4
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Source maps for production debugging
    sourcemap: false,
  },
  // Development server configuration
  server: {
    port: 5173,
    host: true,
    // Fix MIME type issues
    headers: {
      'X-Content-Type-Options': 'nosniff',
    },
    // Ensure proper module handling
    fs: {
      strict: false,
    },
  },
  // Preview server for testing production build
  preview: {
    port: 4173,
    host: true,
    headers: {
      'X-Content-Type-Options': 'nosniff',
    },
  },
  // Environment variable handling
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  // Optimize module resolution
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  // Ensure proper asset handling
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
})
