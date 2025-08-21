import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    build: {
      // Production optimizations for Phase 4
      target: 'es2015',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
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
      sourcemap: mode !== 'production',
      // Ensure proper module format
      modulePreload: {
        polyfill: false,
      },
      // Production-specific optimizations
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
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
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '2.0.0'),
      __BUILD_TIMESTAMP__: JSON.stringify(env.VITE_BUILD_TIMESTAMP || new Date().toISOString()),
      __APP_ENV__: JSON.stringify(mode),
    },
    // Optimize module resolution
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
    },
    // Ensure proper asset handling
    assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
    // Production-specific optimizations
    esbuild: {
      // Ensure proper module format
      format: 'esm',
      // Remove console logs in production
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    // CSS optimization
    css: {
      devSourcemap: mode !== 'production',
    },
  }
})
