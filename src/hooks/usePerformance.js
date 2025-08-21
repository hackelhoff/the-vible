import { useState, useEffect, useCallback, useMemo } from 'react';

export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    isMobile: false
  });

  const [errors, setErrors] = useState([]);

  // Check if device is mobile
  const checkMobile = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  }, []);

  // Detect performance issues using useMemo to avoid infinite loops
  const hasPerformanceIssues = useMemo(() => {
    if (!metrics) return false;
    
    if (metrics.lcp && metrics.lcp > 2500) return true;
    if (metrics.fid && metrics.fid > 100) return true;
    if (metrics.cls && metrics.cls > 0.1) return true;
    if (metrics.ttfb && metrics.ttfb > 600) return true;
    
    return false;
  }, [metrics.lcp, metrics.fid, metrics.cls, metrics.ttfb]);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;
    
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

  // Mobile-specific performance recommendations
  const getMobileRecommendations = useCallback(() => {
    if (!metrics.isMobile) return [];
    
    const recommendations = [];
    
    if (metrics.lcp && metrics.lcp > 2500) {
      recommendations.push('Consider reducing image sizes and optimizing critical resources');
    }
    
    if (metrics.fid && metrics.fid > 100) {
      recommendations.push('Break up long JavaScript tasks and optimize event handlers');
    }
    
    if (metrics.cls && metrics.cls > 0.1) {
      recommendations.push('Ensure images and videos have explicit dimensions');
    }
    
    if (metrics.ttfb && metrics.ttfb > 600) {
      recommendations.push('Optimize server response time and consider CDN');
    }
    
    return recommendations;
  }, [metrics.isMobile, metrics.lcp, metrics.fid, metrics.cls, metrics.ttfb]);

  // Force performance check
  const forcePerformanceCheck = useCallback(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        setMetrics(prev => ({ 
          ...prev, 
          ttfb: navigationEntry.responseStart - navigationEntry.requestStart 
        }));
      }
    }
  }, []);

  // Ensure we always return valid values
  return {
    metrics: metrics || {},
    errors: errors || [],
    getMobileRecommendations: getMobileRecommendations || (() => []),
    forcePerformanceCheck: forcePerformanceCheck || (() => {}),
    isMobile: metrics?.isMobile || false,
    hasPerformanceIssues: hasPerformanceIssues || false
  };
};
