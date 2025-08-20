import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/layout/Layout';
import ErrorBoundary from './components/ui/ErrorBoundary';
import './index.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Store = lazy(() => import('./pages/Store'));
const Signature = lazy(() => import('./pages/Signature'));

// Loading component with sky theme
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen relative">
    <div className="relative z-10">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-800 shadow-lg"></div>
      <div className="mt-4 text-slate-800 font-medium text-lg">Loading...</div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <CartProvider>
          <Layout>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/signatures" element={<Signature />} />
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
