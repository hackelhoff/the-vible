import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      isMobile: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error for debugging
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Check if mobile
    this.setState({ isMobile: window.innerWidth <= 768 });
  }

  componentDidMount() {
    // Check mobile on mount
    this.setState({ isMobile: window.innerWidth <= 768 });
    
    // Add resize listener
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ isMobile: window.innerWidth <= 768 });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  }

  handleClearCache = () => {
    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Reload the page
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-md w-full glass-strong rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">
              Something went wrong
            </h1>
            
            {this.state.isMobile && (
              <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  <strong>Mobile detected:</strong> This might be a performance issue.
                </p>
              </div>
            )}
            
            <p className="text-slate-600 mb-6">
              We encountered an error while loading the page. This is usually temporary.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full btn-primary"
              >
                Try Again
              </button>
              
              {this.state.isMobile && (
                <button
                  onClick={this.handleClearCache}
                  className="w-full btn-secondary"
                >
                  Clear Cache & Retry
                </button>
              )}
            </div>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-slate-600 font-medium">
                  Error Details (Development)
                </summary>
                <div className="mt-2 p-3 bg-red-50 rounded text-xs text-red-800 overflow-auto">
                  <pre>{this.state.error.toString()}</pre>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
