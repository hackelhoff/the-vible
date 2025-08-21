import React from 'react';
import { usePerformance } from '../../hooks/usePerformance';

const PerformanceDashboard = ({ show = false }) => {
  const { 
    metrics, 
    errors, 
    getMobileRecommendations, 
    isMobile, 
    hasPerformanceIssues 
  } = usePerformance();

  if (!show) return null;

  // Safety checks to prevent undefined errors
  const safeErrors = errors || [];
  const safeGetMobileRecommendations = getMobileRecommendations || (() => []);
  const safeMetrics = metrics || {};

  const formatMetric = (value, unit = 'ms') => {
    if (value === null || value === undefined) return 'N/A';
    return `${Math.round(value)}${unit}`;
  };

  const getMetricColor = (value, threshold, unit = 'ms') => {
    if (value === null || value === undefined) return 'text-gray-500';
    if (value <= threshold) return 'text-green-600';
    if (value <= threshold * 1.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceStatus = () => {
    if (hasPerformanceIssues) return { text: '⚠️ Needs Optimization', color: 'text-red-600' };
    return { text: '✅ Good Performance', color: 'text-green-600' };
  };

  const status = getPerformanceStatus();

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-50 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Performance</h3>
        {isMobile && (
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            📱 Mobile
          </span>
        )}
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">FCP:</span>
          <span className={getMetricColor(safeMetrics.fcp, 2000)}>
            {formatMetric(safeMetrics.fcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">LCP:</span>
          <span className={getMetricColor(safeMetrics.lcp, 2500)}>
            {formatMetric(safeMetrics.lcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">FID:</span>
          <span className={getMetricColor(safeMetrics.fid, 100)}>
            {formatMetric(safeMetrics.fid)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">CLS:</span>
          <span className={getMetricColor(safeMetrics.cls, 0.1, '')}>
            {safeMetrics.cls ? safeMetrics.cls.toFixed(3) : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">TTFB:</span>
          <span className={getMetricColor(safeMetrics.ttfb, 600)}>
            {formatMetric(safeMetrics.ttfb)}
          </span>
        </div>
      </div>
      
      {/* Mobile-specific recommendations */}
      {isMobile && safeGetMobileRecommendations().length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-blue-700 mb-2">📱 Mobile Tips:</h4>
          <ul className="space-y-1">
            {safeGetMobileRecommendations().map((recommendation, index) => (
              <li key={index} className="text-xs text-blue-600">
                • {recommendation}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Errors section */}
      {safeErrors.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-red-700 mb-2">🚨 Issues:</h4>
          <ul className="space-y-1">
            {safeErrors.slice(0, 3).map((error, index) => (
              <li key={index} className="text-xs text-red-600">
                • {error}
              </li>
            ))}
            {safeErrors.length > 3 && (
              <li className="text-xs text-gray-500">
                ...and {safeErrors.length - 3} more
              </li>
            )}
          </ul>
        </div>
      )}
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className={`text-center text-xs font-medium ${status.color}`}>
          {status.text}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
