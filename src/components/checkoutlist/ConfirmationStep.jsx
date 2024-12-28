"use client";
import React from 'react';
import Link from 'next/link';
import { BsCheckCircle, BsPrinter } from 'react-icons/bs';
import { IoIosMail } from "react-icons/io";

const ConfirmationStep = ({ 
  orderNumber = "123456",
  customerEmail = "customer@example.com",
  orderDetails,
  onPrintOrder,
  onEmailReceipt 
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <BsCheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Thank You For Your Order!
        </h2>
        <p className="text-gray-600">
          Order #{orderNumber} has been successfully placed
        </p>
      </div>

      <div className="border-t border-b border-gray-200 py-6 mb-6">
        <div className="space-y-4">
          <p className="text-gray-700">
            We have sent a confirmation email to:
            <span className="font-medium ml-1">{customerEmail}</span>
          </p>
          
          <p className="text-gray-700">
            You will receive another email when your order ships. You can also
            check your order status in your account dashboard.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={onPrintOrder}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <BsPrinter className="h-5 w-5" />
          <span>Print Order</span>
        </button>
        
        <button
          onClick={onEmailReceipt}
          className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          <IoIosMail className="h-5 w-5" />
          <span>Email Receipt</span>
        </button>
      </div>

      <div className="space-y-4">
        <Link
          href="/dashboard/orders"
          className="block w-full text-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          View Order Details
        </Link>
        
        <Link
          href="/shop"
          className="block w-full text-center px-6 py-3 border border-black text-black rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationStep;