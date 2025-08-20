import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      alert('Thank you for your purchase! This is a demo - no actual payment will be processed.');
      clearCart();
      setIsCheckingOut(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Cart Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white/95 backdrop-blur-md shadow-xl transform transition-transform duration-300 ease-in-out border-l border-sky-200/30">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-sky-200/30">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-6 h-6 text-sky-600" />
              <h2 className="text-xl font-semibold text-sky-800">Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sky-100/50 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-sky-500" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl text-sky-300 mb-4">🛒</div>
                <h3 className="text-lg font-medium text-sky-600 mb-2">Your cart is empty</h3>
                <p className="text-sky-500">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-sky-50/80 rounded-lg border border-sky-200/30">
                    <div className="w-16 h-16 bg-gradient-to-br from-sky-100/80 to-blue-100/80 rounded-lg flex items-center justify-center">
                      <div className="text-2xl text-sky-400">✨</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-sky-800 truncate">{item.name}</h4>
                      <p className="text-sm text-sky-600">${item.price}</p>
                      {item.size && (
                        <p className="text-xs text-sky-500">Size: {item.size}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-sky-200/50 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4 text-sky-600" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-sky-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-sky-200/50 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4 text-sky-600" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 hover:bg-red-100/50 rounded transition-colors"
                    >
                      <X className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-sky-200/30 p-6 space-y-4">
              {/* Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-sky-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-sky-600">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-sky-800 pt-2 border-t border-sky-200/30">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors duration-200 flex items-center justify-center space-x-2 ${
                    isCheckingOut
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-sky-500 hover:bg-sky-600'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>{isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}</span>
                </button>
                
                <button
                  onClick={clearCart}
                  className="w-full py-2 px-4 text-sm text-sky-600 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
