import { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import { BsHandbag, BsTrash } from 'react-icons/bs';
import { HiMinus, HiPlus } from 'react-icons/hi';
import Link from 'next/link';

const CartSidebar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Diamond Engagement Ring ",
      quantity: 2,
      actualPrice: 1999.99,
      discountedPrice: 1599.99,
      image: "/ring.jpg"
    },
    {
      id: 2,
      name: "Silver Necklace",
      quantity: 1,
      actualPrice: 299.99,
      discountedPrice: 249.99,
      image: "/necklace.jpg"
    },
    {
      id: 3,
      name: "Gold Ring ",
      quantity: 2,
      actualPrice: 199.99,
      discountedPrice: 159.99,
      image: "/ring.jpg"
    },
    {
      id: 4,
      name: "Silver Necklace",
      quantity: 1,
      actualPrice: 299.99,
      discountedPrice: 249.99,
      image: "/necklace.jpg"
    },
  ]);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const updateQuantity = (id, change) => {
    setCartItems(items =>
      items.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity < 1) return item; // Prevent negative quantities
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateDiscount = (actualPrice, discountedPrice) => {
    return Math.round(((actualPrice - discountedPrice) / actualPrice) * 100);
  };

  // Custom link wrapper component
  const CartLink = ({ href, className, children }) => (
    <Link 
      href={href} 
      className={className}
      onClick={closeCart}
    >
      {children}
    </Link>
  );

  return (
    <>
      {/* Cart Toggle Button */}
      <button 
        onClick={toggleCart}
        className="p-2 hover:bg-gray-100 rounded-full transition duration-200 relative"
      >
        <BsHandbag className="w-5 h-5 text-gray-600" />
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {cartItems.length}
        </span>
      </button>

      {/* Cart Sidebar */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
        isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div 
          className="fixed inset-0 bg-gray-800 opacity-25" 
          onClick={toggleCart}
        />
        <div className={`fixed top-0 right-0 bottom-0 flex flex-col sm:w-96 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Cart Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="flex items-center text-xl font-semibold">
              Shopping Cart 
              <span className="ml-2 bg-black text-white rounded-full w-7 h-7 flex items-center justify-center">
                {cartItems.length}
              </span>
            </h2>
            <button 
              onClick={toggleCart}
              className="p-1 bg-gray-100 rounded-full transition duration-200"
            >
              <IoCloseOutline className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-700 transition-all duration-500 hover:rotate-180" />
            </button>
          </div>

          {/* Cart Items Container */}
          <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <BsHandbag className="w-12 h-12 mb-4" />
                <p className="text-lg font-medium text-rose-500">Your cart is empty</p>
                <p className="text-sm">Add items to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-4 border-b border-gray-100 pb-4">
                    <div className="h-24 w-24 sm:h-28 sm:w-28 bg-gray-100 rounded flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{item.name}</h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 rounded-full p-[1px] ml-5"
                          title="Remove from cart"
                        >
                          <IoCloseOutline className="w-5 h-5 transition-all duration-500 hover:rotate-180" />
                        </button>
                      </div>
                      <div className="mt-1">
                        <span className="text-black font-medium">${item.discountedPrice}</span>
                        <span className="text-sm text-gray-400 line-through ml-2">${item.actualPrice}</span>
                        <span className="text-xs text-rose-500 bg-rose-50 rounded p-1 ml-2">
                          {calculateDiscount(item.actualPrice, item.discountedPrice)}% OFF
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        {item.quantity === 1 ? (
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1 text-gray-400 hover:text-red-500"
                          >
                            <BsTrash className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <HiMinus className="w-4 h-4" />
                          </button>
                        )}
                        <span className="mx-3 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded"
                        >
                          <HiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold">
                ${cartItems.reduce((total, item) => total + (item.discountedPrice * item.quantity), 0).toFixed(2)}
              </span>
            </div>
            <div className="flex gap-3">
              <CartLink 
                href="/cart" 
                className="flex-1 text-center bg-white text-black border-2 border-black py-3 rounded font-semibold hover:bg-gray-50 transition duration-200"
              >
                View Cart
              </CartLink>
              <CartLink 
                href="/checkout" 
                className="flex-1 text-center bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition duration-200"
              >
                Checkout
              </CartLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;