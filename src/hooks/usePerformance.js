import { useEffect, useState } from 'react';

export const usePerformance = () => {
  const [metrics, setMetrics] = useState({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  });

  useEffect(() => {
    if (!('performance' in window)) return;

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, fcp: fcp.startTime }));
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lcp.startTime }));
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fid = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, fid: fid.processingStart - fid.startTime }));
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

    // Cleanup
    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  // Performance score calculation
  const getPerformanceScore = () => {
    let score = 100;

    // FCP scoring (0-2000ms is good)
    if (metrics.fcp > 2000) {
      score -= Math.min(30, (metrics.fcp - 2000) / 100);
    }

    // LCP scoring (0-2500ms is good)
    if (metrics.lcp > 2500) {
      score -= Math.min(25, (metrics.lcp - 2500) / 100);
    }

    // CLS scoring (0-0.1 is good)
    if (metrics.cls > 0.1) {
      score -= Math.min(25, metrics.cls * 100);
    }

    return Math.max(0, Math.round(score));
  };

  // Performance insights
  const getInsights = () => {
    const insights = [];

    if (metrics.fcp > 2000) {
      insights.push('First Contentful Paint is slow. Consider optimizing critical rendering path.');
    }

    if (metrics.lcp > 2500) {
      insights.push('Largest Contentful Paint is slow. Optimize images and critical resources.');
    }

    if (metrics.cls > 0.1) {
      insights.push('Cumulative Layout Shift is high. Avoid layout shifts during page load.');
    }

    if (metrics.ttfb > 600) {
      insights.push('Time to First Byte is slow. Optimize server response time.');
    }

    return insights;
  };

  return {
    metrics,
    performanceScore: getPerformanceScore(),
    insights: getInsights(),
    isGood: getPerformanceScore() >= 90
  };
};
