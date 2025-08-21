import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, CheckCircle, AlertCircle } from 'lucide-react';

const Signature = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    message: '',
    email: '' // Optional for newsletter
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [totalSignatures, setTotalSignatures] = useState(0);
  const [recentSignatures, setRecentSignatures] = useState([]);

  useEffect(() => {
    // Fetch current signature count and recent signatures
    fetchSignatureData();
  }, []);

  const fetchSignatureData = async () => {
    try {
      const response = await fetch('/api/signatures');
      if (response.ok) {
        const data = await response.json();
        setTotalSignatures(data.total);
        setRecentSignatures(data.recent || []);
      }
    } catch (error) {
      console.log('Could not fetch signature data:', error);
      // Set mock data for development
      setTotalSignatures(42);
      setRecentSignatures([
        { name: 'Sarah M.', location: 'Portland, OR', message: 'Love this vibe! ✨', timestamp: new Date().toISOString() },
        { name: 'Alex K.', location: 'Austin, TX', message: 'Spreading goodwill everywhere!', timestamp: new Date(Date.now() - 86400000).toISOString() },
        { name: 'Maria L.', location: 'Miami, FL', message: 'The world needs more of this energy', timestamp: new Date(Date.now() - 172800000).toISOString() }
      ]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/signatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmitStatus('success');
        setFormData({ name: '', location: '', message: '', email: '' });
        // Refresh signature data
        fetchSignatureData();
      } else {
        const error = await response.json();
        setSubmitStatus(error.message || 'Failed to submit signature');
      }
    } catch (error) {
      setSubmitStatus('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen px-6 py-8 relative">
      {/* Under Construction Overlay */}
      <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="glass-strong p-12 rounded-2xl text-center max-w-2xl mx-4">
          <div className="text-6xl mb-6">🚧</div>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-4">
            Under Construction
          </h1>
                    <p className="text-lg text-slate-200 mb-6 leading-relaxed">
            Our signature collection is currently being updated. Please return later or email us for inquiries.
          </p>
          <div className="space-y-4">
            <div className="flex gap-4 justify-center">
              <a 
                href="mailto:hello@thevible.com" 
                className="inline-block bg-white text-slate-800 px-8 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"
              >
                Email for Inquiries
              </a>
              <Link to="/">
                <button className="inline-block bg-white text-slate-800 px-8 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors">
                  Return Home
                </button>
              </Link>
            </div>
            <div className="text-sm text-slate-300">
              hello@thevible.com
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <button className="flex items-center gap-2 glass shadow-soft px-4 py-2 rounded-lg border border-slate-300 hover:bg-white/40 transition-colors">
              <span>🏠</span>
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          </Link>
          <Link to="/store">
            <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-soft hover:bg-slate-700 transition-colors">
              <span>🛍️</span>
              <span className="hidden sm:inline">Browse Store</span>
            </button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
            Sign Your Commitment
          </h1>
          <div className="flex items-center justify-center space-x-8 mb-6">
            <div className="flex items-center space-x-2">
              <Users className="w-6 h-6 text-slate-600" />
              <span className="text-2xl font-bold text-slate-700">{totalSignatures.toLocaleString()}</span>
              <span className="text-slate-600">signatures</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-6 h-6 text-slate-600" />
              <span className="text-2xl font-bold text-slate-700">∞</span>
              <span className="text-slate-600">love shared</span>
            </div>
          </div>
        </div>
        
        {/* Signature Form */}
        <div className="glass-strong p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Add Your Signature</h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-50/80 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-700 font-semibold">Signature submitted successfully!</span>
              </div>
              <p className="text-green-600 text-sm mt-1">Thank you for joining our community of love and goodwill.</p>
            </div>
          )}

          {submitStatus && submitStatus !== 'success' && (
            <div className="mb-6 p-4 bg-red-50/80 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 font-semibold">Error</span>
              </div>
              <p className="text-red-600 text-sm mt-1">{submitStatus}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Name (Anonymous) *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your name or anonymous identifier"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
              />
              <p className="text-xs text-slate-500 mt-1">This will be displayed publicly</p>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-2">
                Location (Optional)
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, Country"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="Share your thoughts on love and goodwill..."
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
              />
              <p className="text-xs text-slate-500 mt-1">For newsletter updates only (never shared publicly)</p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-slate-800 hover:bg-slate-700'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Add My Signature'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-50/80 rounded-lg">
            <h3 className="font-semibold text-slate-800 mb-2">Privacy & Community</h3>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Your signature is anonymous and public</li>
              <li>• We prevent duplicate submissions</li>
              <li>• Email is optional and never shared</li>
              <li>• Join thousands spreading love & goodwill</li>
            </ul>
          </div>
        </div>

        {/* Recent Signatures */}
        <div className="glass p-6 mb-6">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Recent Signatures</h3>
          <div className="space-y-4">
            {recentSignatures.map((signature, index) => (
              <div key={index} className="border-l-4 border-slate-200 pl-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-800">{signature.name}</p>
                    {signature.location && (
                      <p className="text-sm text-slate-600">{signature.location}</p>
                    )}
                    {signature.message && (
                      <p className="text-slate-700 mt-1 italic">"{signature.message}"</p>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">{formatTimestamp(signature.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-6 text-center">
          <div className="text-4xl mb-4">🌟</div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Why Sign?</h3>
          <p className="text-slate-700 text-sm">
            Every signature represents a commitment to spreading love and goodwill. 
            Join our growing community and be part of the positive change.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signature;
