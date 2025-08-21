import { useState, useEffect, useCallback } from 'react';

export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    isMobile: false,
    hasPerformanceIssues: false
  });

  const [errors, setErrors] = useState([]);

  // Check if device is mobile
  const checkMobile = useCallback(() => {
    return window.innerWidth <= 768;
  }, []);

  // Detect performance issues
  const detectPerformanceIssues = useCallback((currentMetrics) => {
    const issues = [];
    
    if (currentMetrics.lcp > 2500) {
      issues.push('LCP is too slow (>2.5s)');
    }
    
    if (currentMetrics.fid > 100) {
      issues.push('FID is too slow (>100ms)');
    }
    
    if (currentMetrics.cls > 0.1) {
      issues.push('CLS is too high (>0.1)');
    }
    
    if (currentMetrics.ttfb > 600) {
      issues.push('TTFB is too slow (>600ms)');
    }
    
    return issues.length > 0;
  }, []);

  useEffect(() => {
    const isMobile = checkMobile();
    
    // Set initial mobile state
    setMetrics(prev => ({ ...prev, isMobile }));

    // Performance Observer for Core Web Vitals
    if ('PerformanceObserver' in window) {
      try {
        // First Contentful Paint
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcp = entries[entries.length - 1];
          if (fcp) {
            setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
          }
        });
        fcpObserver.observe({ entryTypes: ['paint'] });

        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcp = entries[entries.length - 1];
          if (lcp) {
            setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fid = entries[entries.length - 1];
          if (fid) {
            setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Time to First Byte
        const navigationEntry = performance.getEntriesByType('navigation')[0];
        if (navigationEntry) {
          setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }));
        }

        // Cleanup observers
        return () => {
          fcpObserver.disconnect();
          lcpObserver.disconnect();
          fidObserver.disconnect();
          clsObserver.disconnect();
        };
      } catch (error) {
        console.warn('Performance monitoring failed:', error);
        setErrors(prev => [...prev, `Performance monitoring error: ${error.message}`]);
      }
    }

    // Mobile-specific performance monitoring
    if (isMobile) {
      // Monitor for mobile-specific issues
      const mobileObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          // Check for long tasks on mobile
          if (entry.entryType === 'longtask' && entry.duration > 50) {
            setErrors(prev => [...prev, `Long task detected: ${entry.duration}ms`]);
          }
        });
      });

      try {
        mobileObserver.observe({ entryTypes: ['longtask'] });
      } catch (error) {
        console.warn('Mobile performance monitoring failed:', error);
      }

      // Monitor memory usage on mobile
      if ('memory' in performance) {
        const checkMemory = () => {
          const memory = performance.memory;
          if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.8) {
            setErrors(prev => [...prev, 'High memory usage detected']);
          }
        };
        
        const memoryInterval = setInterval(checkMemory, 10000);
        return () => {
          clearInterval(memoryInterval);
          mobileObserver.disconnect();
        };
      }

      return () => mobileObserver.disconnect();
    }
  }, [checkMobile]);

  // Update performance issues when metrics change
  useEffect(() => {
    const hasIssues = detectPerformanceIssues(metrics);
    setMetrics(prev => ({ ...prev, hasPerformanceIssues: hasIssues }));
  }, [metrics, detectPerformanceIssues]);

  // Mobile-specific performance recommendations
  const getMobileRecommendations = useCallback(() => {
    if (!metrics.isMobile) return [];
    
    const recommendations = [];
    
    if (metrics.lcp > 2500) {
      recommendations.push('Consider reducing image sizes and optimizing critical resources');
    }
    
    if (metrics.fid > 100) {
      recommendations.push('Break up long JavaScript tasks and optimize event handlers');
    }
    
    if (metrics.cls > 0.1) {
      recommendations.push('Ensure images and videos have explicit dimensions');
    }
    
    if (metrics.ttfb > 600) {
      recommendations.push('Optimize server response time and consider CDN');
    }
    
    return recommendations;
  }, [metrics]);

  // Force performance check
  const forcePerformanceCheck = useCallback(() => {
    if ('performance' in window) {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        setMetrics(prev => ({ 
          ...prev, 
          ttfb: navigationEntry.responseStart - navigationEntry.requestStart 
        }));
      }
    }
  }, []);

  return {
    metrics,
    errors,
    getMobileRecommendations,
    forcePerformanceCheck,
    isMobile: metrics.isMobile,
    hasPerformanceIssues: metrics.hasPerformanceIssues
  };
};
