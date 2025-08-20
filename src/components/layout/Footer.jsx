import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass border-t border-white/30 mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-slate-700 text-sm font-medium">
            © {currentYear} The Vible. Love and goodwill do not require religion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
