import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Simple error handler for module loading issues
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
});

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

// Service Worker registration (simplified)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
