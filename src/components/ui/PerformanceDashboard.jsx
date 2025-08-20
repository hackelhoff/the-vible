import React from 'react';
import { usePerformance } from '../../hooks/usePerformance';

const PerformanceDashboard = ({ show = false }) => {
  const { metrics, performanceScore, insights, isGood } = usePerformance();

  if (!show) return null;

  const formatMetric = (value, unit = 'ms') => {
    if (value === null || value === undefined) return 'N/A';
    return `${Math.round(value)}${unit}`;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMetricColor = (value, threshold, unit = 'ms') => {
    if (value === null || value === undefined) return 'text-gray-500';
    if (value <= threshold) return 'text-green-600';
    if (value <= threshold * 1.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-50 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Performance</h3>
        <div className={`text-lg font-bold ${getScoreColor(performanceScore)}`}>
          {performanceScore}
        </div>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">FCP:</span>
          <span className={getMetricColor(metrics.fcp, 2000)}>
            {formatMetric(metrics.fcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">LCP:</span>
          <span className={getMetricColor(metrics.lcp, 2500)}>
            {formatMetric(metrics.lcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">FID:</span>
          <span className={getMetricColor(metrics.fid, 100)}>
            {formatMetric(metrics.fid)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">CLS:</span>
          <span className={getMetricColor(metrics.cls, 0.1, '')}>
            {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">TTFB:</span>
          <span className={getMetricColor(metrics.ttfb, 600)}>
            {formatMetric(metrics.ttfb)}
          </span>
        </div>
      </div>
      
      {insights.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-xs font-semibold text-gray-700 mb-2">Insights:</h4>
          <ul className="space-y-1">
            {insights.map((insight, index) => (
              <li key={index} className="text-xs text-red-600">
                • {insight}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className={`text-center text-xs font-medium ${
          isGood ? 'text-green-600' : 'text-red-600'
        }`}>
          {isGood ? '✅ Good Performance' : '⚠️ Needs Optimization'}
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
