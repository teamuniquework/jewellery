// WishlistItem.jsx
import React from "react";
import { BsHandbag, BsTrash } from "react-icons/bs";

const WishlistItem = ({ item, onRemove, onMoveToCart }) => {
  const calculateDiscount = (actualPrice, discountedPrice) => {
    const discount = ((actualPrice - discountedPrice) / actualPrice) * 100;
    return Math.round(discount);
  };

  return (
    <div className="p-4 hover:shadow-md transition-shadow duration-200">
      <div className="relative ">
        {/* Product Image */}
        <div className="h-48 w-full bg-gray-100 rounded mb-4">
          {/* Replace with actual image */}
          {/* <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded" /> */}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition-colors duration-200 group"
            title="Remove from wishlist"
          >
            <BsTrash className="w-3 h-3 text-gray-500 group-hover:text-rose-500" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <h3 className="font-medium text-gray-800 mb-2">{item.name}</h3>
      <div className="flex items-baseline mb-2">
        <span className="text-lg font-semibold text-gray-900">
          ${item.discountedPrice}
        </span>
        <span className="text-sm text-gray-400 line-through ml-2">
          ${item.actualPrice}
        </span>
        {item.actualPrice > item.discountedPrice && (
          <span className="text-xs text-rose-500 bg-rose-50 rounded px-2 py-1 ml-2">
            {calculateDiscount(item.actualPrice, item.discountedPrice)}% OFF
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="mb-4">
        {item.inStock ? (
          <span className="text-sm text-green-500">In Stock</span>
        ) : (
          <span className="text-sm text-rose-500">Out of Stock</span>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={() => onMoveToCart(item.id)}
        disabled={!item.inStock}
        className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded transition-colors duration-200
          ${
            item.inStock
              ? "bg-black hover:bg-gray-800 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
      >
        <BsHandbag className="w-5 h-5" />
        <span>Move to Cart</span>
      </button>
    </div>
  );
};

export default WishlistItem;