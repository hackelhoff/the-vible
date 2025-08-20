import React from 'react';
import { Link } from 'react-router-dom';
import RandomQuote from '../components/quotes/RandomQuote';

const Home = () => {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-light text-slate-800 mb-6 leading-tight">
            The Vible
          </h1>
          <h2 className="text-3xl md:text-5xl font-light text-slate-700 mb-6 leading-tight">
            Love and goodwill do not require religion, just a vibe
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8">
            A simple truth that transcends boundaries and unites humanity
          </p>
          <div className="text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            <p className="mb-4">
              This doctrine represents a fundamental principle that can guide our interactions 
              with one another, regardless of our individual beliefs or backgrounds.
            </p>
            <p>
              It is a call to recognize the inherent goodness in humanity and to act 
              with compassion and kindness toward all people.
            </p>
          </div>
        </header>

        {/* Callout Section */}
        <div className="text-center mb-12">
          <p className="text-3xl md:text-4xl font-light text-slate-700 leading-tight">
            ⚡ Be Excellent to each other 🤝
          </p>
        </div>

        {/* Random Quote Section */}
        <section className="mb-12">
          <div className="max-w-4xl mx-auto">
            <RandomQuote />
          </div>
        </section>

        {/* Features Section */}
        <section aria-labelledby="features-heading" className="mb-12">
          <h2 id="features-heading" className="sr-only">Main Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Link 
              to="/signatures" 
              className="group block"
              aria-label="Add your digital signature to show your commitment"
            >
              <div className="p-8 glass-strong rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-105 focus-within:ring-4 focus-within:ring-blue-400 focus-within:ring-offset-2">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">✍️</div>
                <h3 className="font-bold text-slate-800 text-xl mb-3 group-hover:text-slate-700 transition-colors">
                  Sign Your Commitment
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Add your digital signature to show your commitment to love and goodwill
                </p>
                <div className="mt-4 text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors">
                  Click to sign →
                </div>
              </div>
            </Link>
            
            <Link 
              to="/store" 
              className="group block"
              aria-label="Browse merchandise and support charitable organizations"
            >
              <div className="p-8 glass-strong rounded-xl shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:scale-105 focus-within:ring-4 focus-within:ring-green-400 focus-within:ring-offset-2">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">🛍️</div>
                <h3 className="font-bold text-slate-800 text-xl mb-3 group-hover:text-slate-700 transition-colors">
                  Support Good Causes
                </h3>
                <p className="text-slate-600 text-base leading-relaxed">
                  Purchase merchandise to support charitable organizations
                </p>
                <div className="mt-4 text-green-600 text-sm font-medium group-hover:text-green-700 transition-colors">
                  Browse store →
                </div>
              </div>
            </Link>
          </div>
        </section>
        
        <footer>
          <div className="text-sm text-slate-600 text-center">
            <p>Explore our message, sign your commitment, and support good causes.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
