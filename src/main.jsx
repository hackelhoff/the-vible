import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Enhanced error handler for module loading issues
window.addEventListener('error', (event) => {
  if (event.error && event.error.message.includes('MIME type')) {
    console.warn('MIME type issue detected, attempting recovery...');
    // Force reload if MIME type issues persist
    setTimeout(() => {
      if (document.readyState === 'loading') {
        window.location.reload();
      }
    }, 1000);
  }
  
  // Handle syntax errors that might be caused by MIME type issues
  if (event.error && event.error.name === 'SyntaxError') {
    console.warn('Syntax error detected, likely MIME type issue, attempting recovery...');
    // Force reload for syntax errors
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
});

// Handle service worker messages
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'FORCE_RELOAD') {
      console.log('Service worker requested force reload');
      window.location.reload();
    }
  });
}

// Performance monitoring (simplified for mobile)
if ('performance' in window && 'PerformanceObserver' in window) {
  try {
    // Track Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', entry.processingStart - entry.startTime);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

    // Track Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });
  } catch (error) {
    console.warn('Performance monitoring failed:', error);
  }
}

// Enhanced Service Worker registration with update handling
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Handle service worker updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              if (confirm('New version available! Reload to update?')) {
                window.location.reload();
              }
            }
          });
        });
        
        // Force update if there are any issues
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
        // If service worker fails, clear any existing caches
        if ('caches' in window) {
          caches.keys().then(cacheNames => {
            cacheNames.forEach(cacheName => {
              caches.delete(cacheName);
            });
          });
        }
      });
    
    // Handle service worker controller change
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  });
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
