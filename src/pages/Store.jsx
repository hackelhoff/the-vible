import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { products } from '../data/products';
import { Search, Filter, ShoppingCart } from 'lucide-react';

const Store = () => {
  const { addToCart, cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1
    });
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
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
            Our store is currently being updated. Please return later or email us for inquiries.
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

      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <button className="flex items-center gap-2 glass shadow-soft px-4 py-2 rounded-lg border border-slate-300 hover:bg-white/40 transition-colors">
              <span>🏠</span>
              <span className="hidden sm:inline">Back to Home</span>
            </button>
          </Link>
          <Link to="/signatures">
            <button className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-soft hover:bg-slate-700 transition-colors">
              <span>✍️</span>
              <span className="hidden sm:inline">Sign Commitment</span>
            </button>
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-slate-800 mb-4">
            Support Good Causes
          </h1>
          <p className="text-lg text-slate-600">
            All proceeds from our merchandise go to selected charities
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <ShoppingCart className="w-5 h-5 text-slate-600" />
            <span className="font-medium text-slate-700">{getCartItemCount()} items in cart</span>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white/80"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="glass-strong overflow-hidden hover:shadow-soft-lg transition-all duration-300 hover:scale-105">
              <div className="aspect-square bg-gradient-to-br from-slate-100/80 to-blue-100/80 flex items-center justify-center">
                <div className="text-6xl text-slate-400">✨</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{product.name}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-slate-600">${product.price}</span>
                  <span className="text-sm text-slate-500 capitalize">{product.category}</span>
                </div>
                {product.sizes && (
                  <div className="mb-4">
                    <p className="text-sm text-slate-600 mb-2">Available Sizes:</p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <span key={size} className="px-2 py-1 bg-slate-100/80 text-slate-700 text-xs rounded-full">
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
                    product.inStock
                      ? 'bg-slate-800 hover:bg-slate-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl text-slate-300 mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No products found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;
