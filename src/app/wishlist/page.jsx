"use client";
import React, { useState } from "react";
import { BsHeart } from "react-icons/bs";
import Link from "next/link";
import WishlistItem from "@/components/WishlistItem";

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Diamond Engagement Ring",
      actualPrice: 1999.99,
      discountedPrice: 1799.99,
      image: "/ring.jpg",
      inStock: true,
    },
    {
      id: 2,
      name: "Pearl Necklace",
      actualPrice: 899.99,
      discountedPrice: 799.99,
      image: "/necklace.jpg",
      inStock: false,
    },
    {
      id: 3,
      name: "Diamond Engagement Ring",
      actualPrice: 1999.99,
      discountedPrice: 1799.99,
      image: "/ring.jpg",
      inStock: true,
    },
    {
      id: 4,
      name: "Pearl Necklace",
      actualPrice: 899.99,
      discountedPrice: 799.99,
      image: "/necklace.jpg",
      inStock: false,
    },
    {
      id: 5,
      name: "Diamond Engagement Ring",
      actualPrice: 1999.99,
      discountedPrice: 1799.99,
      image: "/ring.jpg",
      inStock: true,
    },
    
  ]);

  const handleRemoveFromWishlist = (itemId) => {
    setWishlistItems((prevItems) => 
      prevItems.filter((item) => item.id !== itemId)
    );
  };

  const handleMoveToCart = (itemId) => {
    console.log(`Moving item ${itemId} to cart`);
    handleRemoveFromWishlist(itemId);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
          <BsHeart className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium text-rose-500">Your wishlist is empty</p>
          <p className="text-sm mb-6">Add items to your wishlist for later</p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-200 font-normal"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-gray-200">
          {wishlistItems.map((item,index) => (
            <div
              key={item.id}
              className={`border-r border-b ${index < 3 ? 'border-t' : ''} border-gray-200`}
            >
              <WishlistItem
                item={item}
                onRemove={handleRemoveFromWishlist}
                onMoveToCart={handleMoveToCart}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;