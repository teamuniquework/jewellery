import React from "react";
import { BsHandbag, BsTrash } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { HiMinus, HiPlus } from "react-icons/hi";

const CartItem = ({ cartItems = [], onUpdateQuantity, onRemoveItem }) => {
  const calculateDiscount = (actualPrice, discountedPrice) => {
    const discount = ((actualPrice - discountedPrice) / actualPrice) * 100;
    return Math.round(discount);
  };

  const calculateItemTotal = (item) => {
    return (item.discountedPrice * item.quantity).toFixed(2);
  };

  return (
    <div className="flex-1 py-4 md:px-4 mt-auto">
      {/* Cart Header */}
      <div className="grid grid-cols-[1fr_auto] gap-4 pb-4 border-b border-gray-200 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Product</h2>
        <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">
          Total
        </h2>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="group relative grid grid-cols-[1fr_auto] gap-4 border-b border-gray-100 pb-4 rounded-lg transition-colors duration-200"
          >
            {/* Product Details */}
            <div className="flex space-x-4">
              <div className="h-24 w-24 sm:h-28 sm:w-28 bg-gray-100 rounded flex-shrink-0"></div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <div className="mt-1">
                  <span className="text-black font-medium">
                    ${item.discountedPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through ml-2">
                    ${item.actualPrice}
                  </span>
                  <span className="text-xs text-rose-500 bg-rose-50 rounded p-1 ml-2">
                    {calculateDiscount(item.actualPrice, item.discountedPrice)}%
                    OFF
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  {item.quantity === 1 ? (
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-500"
                    >
                      <BsTrash className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <HiMinus className="w-4 h-4" />
                    </button>
                  )}
                  <span className="mx-3 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <HiPlus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Total and Close Button Column */}
            <div className="flex flex-col items-center">
              <span className="font-medium text-gray-900 mb-5 hidden sm:block">
                ${calculateItemTotal(item)}
              </span>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-gray-500 hover:text-red-600 rounded-full border border-gray-500 transition-opacity duration-200"
              title="Remove from cart"
              >
                <IoCloseOutline className="w-5 h-5 transition-all duration-500 hover:rotate-180" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;
