import React, { useState, useEffect } from 'react';
import { getRandomQuote } from '../../data/quotes';

const RandomQuote = ({ className = '', showRefresh = true }) => {
  const [quote, setQuote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadNewQuote = () => {
    setIsLoading(true);
    // Small delay to show loading state
    setTimeout(() => {
      const newQuote = getRandomQuote();
      setQuote(newQuote);
      setIsLoading(false);
    }, 200);
  };

  useEffect(() => {
    loadNewQuote();
  }, []);

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="glass rounded-xl p-6">
          <div className="space-y-3">
            <div className="h-4 bg-slate-200/50 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200/50 rounded w-1/2"></div>
            <div className="h-4 bg-slate-200/50 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!quote) {
    return null;
  }

  return (
    <div className={className}>
      <div className="glass rounded-xl p-6 hover:shadow-soft-lg transition-shadow duration-300">
        <div className="flex items-start space-x-3">
          <div className="flex-1 min-w-0">
            <blockquote className="text-lg text-slate-800 leading-relaxed mb-3">
              "{quote.text}"
            </blockquote>
            <footer className="flex items-center justify-between">
              <cite className="text-slate-700 font-medium not-italic">
                — {quote.author}
              </cite>
              {showRefresh && (
                <button
                  onClick={loadNewQuote}
                  className="text-slate-500 hover:text-slate-700 transition-colors duration-200 p-2 rounded-lg hover:bg-white/20"
                  title="Get a new quote"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              )}
            </footer>
          </div>
        </div>
        
        {/* Category badge */}
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200/50 text-slate-700">
            {quote.category}
          </span>
          <div className="flex space-x-1">
            {[...Array(quote.inspiration)].map((_, i) => (
              <span key={i} className="text-slate-400">✨</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
