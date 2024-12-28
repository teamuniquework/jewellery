"use client";
import React, { useState } from "react";

const CheckoutPage = () => {
  const states = [
    { code: "AL", name: "Alabama" },
    { code: "AK", name: "Alaska" },
    { code: "AZ", name: "Arizona" },
    { code: "AR", name: "Arkansas" },
    { code: "CA", name: "California" },
    { code: "CO", name: "Colorado" },
    { code: "CT", name: "Connecticut" },
    { code: "DE", name: "Delaware" },
    { code: "FL", name: "Florida" },
    { code: "GA", name: "Georgia" },
    { code: "HI", name: "Hawaii" },
    { code: "ID", name: "Idaho" },
    { code: "IL", name: "Illinois" },
    { code: "IN", name: "Indiana" },
    { code: "IA", name: "Iowa" },
    { code: "KS", name: "Kansas" },
    { code: "KY", name: "Kentucky" },
    { code: "LA", name: "Louisiana" },
    { code: "ME", name: "Maine" },
    { code: "MD", name: "Maryland" },
    { code: "MA", name: "Massachusetts" },
    { code: "MI", name: "Michigan" },
    { code: "MN", name: "Minnesota" },
    { code: "MS", name: "Mississippi" },
    { code: "MO", name: "Missouri" },
    { code: "MT", name: "Montana" },
    { code: "NE", name: "Nebraska" },
    { code: "NV", name: "Nevada" },
    { code: "NH", name: "New Hampshire" },
    { code: "NJ", name: "New Jersey" },
    { code: "NM", name: "New Mexico" },
    { code: "NY", name: "New York" },
    { code: "NC", name: "North Carolina" },
    { code: "ND", name: "North Dakota" },
    { code: "OH", name: "Ohio" },
    { code: "OK", name: "Oklahoma" },
    { code: "OR", name: "Oregon" },
    { code: "PA", name: "Pennsylvania" },
    { code: "RI", name: "Rhode Island" },
    { code: "SC", name: "South Carolina" },
    { code: "SD", name: "South Dakota" },
    { code: "TN", name: "Tennessee" },
    { code: "TX", name: "Texas" },
    { code: "UT", name: "Utah" },
    { code: "VT", name: "Vermont" },
    { code: "VA", name: "Virginia" },
    { code: "WA", name: "Washington" },
    { code: "WV", name: "West Virginia" },
    { code: "WI", name: "Wisconsin" },
    { code: "WY", name: "Wyoming" },
  ];

  const savedAddresses = [
    {
      id: 1,
      name: "Home",
      fullName: "Khargosh sen",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      stateName: "New York",
    },
    {
      id: 2,
      name: "Office",
      fullName: "Kachhua sen",
      address: "456 Work Ave",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      stateName: "New York",
    },
  ];

  const shippingOptions = [
    { id: 'free', name: 'Standard Shipping', price: 0, description: 'Delivery in 5-7 business days', estimate: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 19, description: 'Delivery in 2-3 business days', estimate: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', price: 29, description: 'Next business day delivery', estimate: 'Next business day' }
  ];

  const [formData, setFormData] = useState({
    // Contact
    email: "",

    // Shipping
    useExistingShipping: false,
    selectedShippingAddress: "",
    shippingAddress: "",
    shippingApartment: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingPhone: "",
    shippingFullName: "",

    // Billing
    billingSameAsShipping: false,
    useExistingBilling: false,
    selectedBillingAddress: "",
    billingAddress: "",
    billingApartment: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingPhone: "",
    billingFullName: "",

    // Shipping method
    shippingMethod: 'free',

    // Payment
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Copy shipping to billing if checkbox is checked
    if (name === "billingSameAsShipping" && checked) {
      setFormData((prev) => ({
        ...prev,
        billingAddress: prev.shippingAddress,
        billingApartment: prev.shippingApartment,
        billingCity: prev.shippingCity,
        billingState: prev.shippingState,
        billingZip: prev.shippingZip,
        billingPhone: prev.shippingPhone,
        billingFullName: prev.shippingFullName,
      }));
    }

    // Handle saved address selection
    if (name === "selectedShippingAddress" && value) {
      const selectedAddress = savedAddresses.find(
        (addr) => addr.id === parseInt(value)
      );
      if (selectedAddress) {
        setFormData((prev) => ({
          ...prev,
          shippingAddress: selectedAddress.address,
          shippingApartment: selectedAddress.apartment,
          shippingCity: selectedAddress.city,
          shippingState: selectedAddress.state,
          shippingZip: selectedAddress.zipCode,
          shippingPhone: selectedAddress.phone,
          shippingFullName: selectedAddress.fullName,
        }));
      }
    }

    if (name === "selectedBillingAddress" && value) {
      const selectedAddress = savedAddresses.find(
        (addr) => addr.id === parseInt(value)
      );
      if (selectedAddress) {
        setFormData((prev) => ({
          ...prev,
          billingAddress: selectedAddress.address,
          billingApartment: selectedAddress.apartment,
          billingCity: selectedAddress.city,
          billingState: selectedAddress.state,
          billingZip: selectedAddress.zipCode,
          billingPhone: selectedAddress.phone,
          billingFullName: selectedAddress.fullName,
        }));
      }
    }
  };

  // Sample order data - replace with your actual data
  const orderItems = [
    {
      id: 1,
      name: "Premium T-Shirt",
      price: 29.99,
      quantity: 2,
      image: "/tshirt.jpg",
    },
    {
      id: 2,
      name: "Classic Jeans",
      price: 59.99,
      quantity: 1,
      image: "/jeans.jpg",
    },
  ];

  const calculateOrderSummary = () => {
    const subtotal = 119.97; // Your original subtotal
    const selectedShipping = shippingOptions.find(option => option.id === formData.shippingMethod);
    const shippingCost = selectedShipping ? selectedShipping.price : 0;
    const tax = 12.5; // Your original tax
    return {
      subtotal,
      shipping: shippingCost,
      tax,
      total: subtotal + shippingCost + tax
    };
  };

  const orderSummary = calculateOrderSummary();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle order submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-6">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  {/* Contact form fields */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

                {savedAddresses.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">
                      Saved Addresses
                    </h3>
                    <div className="space-y-3">
                      {savedAddresses.map((addr) => (
                        <label key={addr.id} className="flex items-center">
                          <input
                            type="radio"
                            name="selectedShippingAddress"
                            value={addr.id}
                            onChange={handleInputChange}
                            className="mr-3"
                          />
                          <span>
                            {addr.name}: {addr.fullName}, {addr.address}, {addr.city},{" "}
                            {addr.state} {addr.zipCode}
                          </span>
                        </label>
                      ))}
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="selectedShippingAddress"
                          value=""
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <span>Use a new address</span>
                      </label>
                    </div>
                  </div>
                )}

                {(!formData.useExistingShipping ||
                  !formData.selectedShippingAddress) && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="shippingFullName"
                        value={formData.shippingFullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="shippingAddress"
                        value={formData.shippingAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apartment, suite, etc. <span className="text-sm font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="shippingApartment"
                        value={formData.shippingApartment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="shippingCity"
                          value={formData.shippingCity}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <select
                          name="shippingState"
                          value={formData.shippingState}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded"
                          required
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state.code} value={state.code}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          name="shippingZip"
                          value={formData.shippingZip}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="shippingPhone"
                          value={formData.shippingPhone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Address */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Billing Address</h2>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="billingSameAsShipping"
                      checked={formData.billingSameAsShipping}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      Same as shipping
                    </span>
                  </label>
                </div>

                {!formData.billingSameAsShipping && (
                  <>
                    {savedAddresses.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-3">
                          Saved Addresses
                        </h3>
                        <div className="space-y-3">
                          {savedAddresses.map((addr) => (
                            <label key={addr.id} className="flex items-center">
                              <input
                                type="radio"
                                name="selectedBillingAddress"
                                value={addr.id}
                                onChange={handleInputChange}
                                className="mr-3"
                              />
                              <span>
                                {addr.name}: {addr.fullName}, {addr.address}, {addr.city},{" "}
                                {addr.state} {addr.zipCode}
                              </span>
                            </label>
                          ))}
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="selectedBillingAddress"
                              value=""
                              onChange={handleInputChange}
                              className="mr-3"
                            />
                            <span>Use a new address</span>
                          </label>
                        </div>
                      </div>
                    )}

                    {(!formData.useExistingBilling ||
                      !formData.selectedBillingAddress) && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="billingFullName"
                            value={formData.billingFullName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address
                          </label>
                          <input
                            type="text"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Apartment, suite, etc. <span className="text-sm font-normal">(optional)</span>
                          </label>
                          <input
                            type="text"
                            name="billingApartment"
                            value={formData.billingApartment}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              name="billingCity"
                              value={formData.billingCity}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              State
                            </label>
                            <select
                              name="billingState"
                              value={formData.billingState}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded"
                              required
                            >
                              <option value="">Select State</option>
                              {states.map((state) => (
                                <option key={state.code} value={state.code}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              ZIP Code
                            </label>
                            <input
                              type="text"
                              name="billingZip"
                              value={formData.billingZip}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              name="billingPhone"
                              value={formData.billingPhone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-2 border border-gray-300 rounded"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Add Shipping Options section after Shipping Address */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-6">Shipping Options</h2>
                <div className="space-y-4">
                  {shippingOptions.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-start p-4 border rounded-lg cursor-pointer ${
                        formData.shippingMethod === option.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={option.id}
                        checked={formData.shippingMethod === option.id}
                        onChange={handleInputChange}
                        className="mt-1 mr-4"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{option.name}</span>
                          <span className="font-medium">
                            {option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {option.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Estimated delivery: {option.estimate}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 mb-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange({
                          target: { name: "paymentMethod", value: "card" },
                        })
                      }
                      className={`flex-1 p-4 border rounded-lg ${
                        formData.paymentMethod === "card"
                          ? "border-black bg-gray-50"
                          : "border-gray-300"
                      }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleInputChange({
                          target: { name: "paymentMethod", value: "paypal" },
                        })
                      }
                      className={`flex-1 p-4 border rounded-lg ${
                        formData.paymentMethod === "paypal"
                          ? "border-black bg-gray-50"
                          : "border-gray-300"
                      }`}
                    >
                      PayPal
                    </button>
                  </div>

                  {formData.paymentMethod === "card" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name on Card
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow top-6">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="divide-y divide-gray-200">
                {orderItems.map((item) => (
                  <div key={item.id} className="py-4 flex items-start">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="ml-4 text-base font-medium text-gray-900">
                          ${item.price}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-base text-gray-600">
                  <p>Subtotal</p>
                  <p>${orderSummary.subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <p>Shipping</p>
                  <p>{orderSummary.shipping === 0
                    ? 'FREE'
                    : `$${orderSummary.shipping.toFixed(2)}`}</p>
                </div>
                <div className="flex justify-between text-base text-gray-600">
                  <p>Tax</p>
                  <p>${orderSummary.tax.toFixed(2)}</p>
                </div>
                <div className="border-t pt-4 flex justify-between text-lg font-medium">
                  <p>Total</p>
                  <p>${orderSummary.total.toFixed(2)}</p>
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full mt-6 bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors duration-200"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
