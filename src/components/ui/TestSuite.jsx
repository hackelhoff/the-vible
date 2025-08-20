import React, { useState, useEffect } from 'react';
import { usePerformance } from '../../hooks/usePerformance';

const TestSuite = ({ show = false }) => {
  const [tests, setTests] = useState([]);
  const [running, setRunning] = useState(false);
  const { metrics } = usePerformance();

  const testCases = [
    {
      name: 'Performance Metrics',
      test: () => {
        const results = [];
        if (metrics.fcp && metrics.fcp < 3000) results.push('✅ FCP under 3s');
        else if (metrics.fcp) results.push('⚠️ FCP over 3s');
        
        if (metrics.lcp && metrics.lcp < 4000) results.push('✅ LCP under 4s');
        else if (metrics.lcp) results.push('⚠️ LCP over 4s');
        
        if (metrics.cls && metrics.cls < 0.1) results.push('✅ CLS under 0.1');
        else if (metrics.cls) results.push('⚠️ CLS over 0.1');
        
        return results.length > 0 ? results : ['ℹ️ No performance data yet'];
      }
    },
    {
      name: 'Responsive Design',
      test: () => {
        const results = [];
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        if (width < 768) results.push('✅ Mobile viewport detected');
        if (width >= 768 && width < 1024) results.push('✅ Tablet viewport detected');
        if (width >= 1024) results.push('✅ Desktop viewport detected');
        
        results.push(`📱 Viewport: ${width}x${height}`);
        return results;
      }
    },
    {
      name: 'Browser Features',
      test: () => {
        const results = [];
        
        if ('serviceWorker' in navigator) results.push('✅ Service Worker supported');
        else results.push('❌ Service Worker not supported');
        
        if ('localStorage' in window) results.push('✅ Local Storage supported');
        else results.push('❌ Local Storage not supported');
        
        if ('IntersectionObserver' in window) results.push('✅ Intersection Observer supported');
        else results.push('❌ Intersection Observer not supported');
        
        return results;
      }
    },
    {
      name: 'Accessibility',
      test: () => {
        const results = [];
        
        // Check for proper heading structure
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length > 0) results.push('✅ Headings found');
        else results.push('❌ No headings found');
        
        // Check for alt text on images
        const images = document.querySelectorAll('img');
        const imagesWithAlt = Array.from(images).filter(img => img.alt);
        if (imagesWithAlt.length === images.length) results.push('✅ All images have alt text');
        else results.push(`⚠️ ${images.length - imagesWithAlt.length} images missing alt text`);
        
        return results;
      }
    }
  ];

  const runTests = async () => {
    setRunning(true);
    const results = [];
    
    for (const testCase of testCases) {
      try {
        const result = testCase.test();
        results.push({
          name: testCase.name,
          results: result,
          status: 'completed'
        });
      } catch (error) {
        results.push({
          name: testCase.name,
          results: [`❌ Test failed: ${error.message}`],
          status: 'failed'
        });
      }
    }
    
    setTests(results);
    setRunning(false);
  };

  useEffect(() => {
    if (show) {
      runTests();
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Test Suite</h3>
        <button
          onClick={runTests}
          disabled={running}
          className="px-3 py-1 bg-sky-600 text-white rounded text-sm hover:bg-sky-700 disabled:opacity-50"
        >
          {running ? 'Running...' : 'Run Tests'}
        </button>
      </div>
      
      <div className="space-y-3">
        {tests.map((test, index) => (
          <div key={index} className="border rounded p-3">
            <h4 className="font-medium text-gray-700 mb-2">{test.name}</h4>
            <div className="space-y-1">
              {test.results.map((result, resultIndex) => (
                <div key={resultIndex} className="text-sm text-gray-600">
                  {result}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {tests.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Click "Run Tests" to start testing
        </div>
      )}
    </div>
  );
};

export default TestSuite;
