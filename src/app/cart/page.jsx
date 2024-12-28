"use client";
import Cart from "@/components/CartItem";
import CheckoutSidebar from "@/components/CheckoutSidebar";
import Link from "next/link";
import React, { useState } from "react";
import { BsHandbag } from "react-icons/bs";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product Name",
      actualPrice: 99.99,
      discountedPrice: 79.99,
      quantity: 1,
    },
    {
      id: 2,
      name: "Heart Embrace Gold Bracelet",
      quantity: 1,
      actualPrice: 1299.99,
      discountedPrice: 1249.99,
      image: "/necklace.jpg",
    },
    {
      id: 3,
      name: "Gold Ring ",
      quantity: 2,
      actualPrice: 199.99,
      discountedPrice: 159.99,
      image: "/ring.jpg",
    },
    {
      id: 4,
      name: "Silver Necklace",
      quantity: 1,
      actualPrice: 299.99,
      discountedPrice: 249.99,
      image: "/necklace.jpg",
    },
    {
      id: 5,
      name: "Silver Necklace",
      quantity: 1,
      actualPrice: 299.99,
      discountedPrice: 249.99,
      image: "/necklace.jpg",
    },
    {
      id: 6,
      name: "Gold Ring ",
      quantity: 2,
      actualPrice: 199.99,
      discountedPrice: 159.99,
      image: "/ring.jpg",
    },
    {
      id: 7,
      name: "Silver Necklace",
      quantity: 1,
      actualPrice: 299.99,
      discountedPrice: 249.99,
      image: "/necklace.jpg",
    },
    // ... more items
  ]);

  const handleUpdateQuantity = (itemId, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
          <BsHandbag className="w-12 h-12 mb-4" />
          <p className="text-lg font-medium text-rose-500">Your cart is empty</p>
          <p className="text-sm">Add items to get started</p>
          <Link 
            href="/shop" 
            className="mt-5 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors duration-200 font-normal"
          >
            Go to Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
          <div className="lg:w-1/3">
            <CheckoutSidebar cartItems={cartItems} className="sticky top-8" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;