import React from 'react';
import Header from './Header';
import Footer from './Footer';
import PerformanceDashboard from '../ui/PerformanceDashboard';
import TestSuite from '../ui/TestSuite';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <PerformanceDashboard show={process.env.NODE_ENV === 'development'} />
      <TestSuite show={process.env.NODE_ENV === 'development'} />
    </div>
  );
};

export default Layout;
