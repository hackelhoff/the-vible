import React, { Suspense, lazy, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import './index.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Store = lazy(() => import('./pages/Store'));

// Enhanced loading component with mobile optimization
const LoadingSpinner = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen relative">
      <div className="relative z-10">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-800 shadow-lg"></div>
        <div className="mt-4 text-slate-800 font-medium text-lg">Loading...</div>
        {isMobile && (
          <div className="mt-2 text-sm text-slate-600 text-center max-w-xs">
            Optimizing for mobile experience...
          </div>
        )}
      </div>
    </div>
  );
};

// Mobile detection hook
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsLoading(false);
    };

    // Check immediately
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return { isMobile, isLoading };
};

function App() {
  const { isLoading } = useMobileDetection();

  // Show loading while detecting mobile
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <Router>
        <CartProvider>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </Layout>
        </CartProvider>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
