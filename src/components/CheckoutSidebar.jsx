import React, { useState } from 'react';
import { IoTicketOutline } from 'react-icons/io5';

const CheckoutSidebar = ({ cartItems, className }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // Assuming 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleApplyCoupon = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      setIsApplying(false);
      setCouponCode('');
    }, 1000);
  };

  return (
    <div className={`bg-white rounded-lg p-6 ${className}`}>
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      
      {/* Coupon Input */}
      <div className="flex gap-2 mb-6">
        <div className="flex-1 relative">
          <IoTicketOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={handleApplyCoupon}
          disabled={!couponCode || isApplying}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
        >
          {isApplying ? 'Applying...' : 'Apply'}
        </button>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Tax</span>
          <span>${calculateTax().toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-200" />
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button 
        className="w-full py-3 bg-black text-white rounded font-medium hover:bg-gray-800 transition-colors"
        onClick={() => alert('Proceeding to checkout...')}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CheckoutSidebar;