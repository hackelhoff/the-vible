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
              This belief represents a fundamental principle that can guide our interactions 
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

        {/* Call to Action Section */}
        <section aria-labelledby="cta-heading" className="mb-12">
          <h2 id="cta-heading" className="sr-only">Call to Action</h2>
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-light text-slate-700 mb-4">
                Ready to Spread the Vibe?
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Support charitable organizations while embracing the philosophy of love and goodwill through our curated merchandise.
              </p>
            </div>
            
            <Link 
              to="/store" 
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2"
              aria-label="Browse merchandise and support charitable organizations"
            >
              <span className="text-xl mr-3 group-hover:scale-110 transition-transform duration-300">🛍️</span>
              <span className="text-lg">Visit Our Store</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>
        </section>
        
        <footer>
          <div className="text-sm text-slate-600 text-center">
            <p>Explore our message and support good causes.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
