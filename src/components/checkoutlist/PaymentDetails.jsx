'use client'
import { useState } from "react";

const PaymentDetails = ({ onNext, initialData = {} }) => {
    const [paymentMethod, setPaymentMethod] = useState(initialData.paymentMethod || 'card');
    const [cardData, setCardData] = useState({
      cardNumber: initialData.cardNumber || '',
      cardName: initialData.cardName || '',
      expiryDate: initialData.expiryDate || '',
      cvv: initialData.cvv || '',
    });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onNext({ paymentMethod, ...cardData });
    };
  
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`flex-1 p-4 border rounded-lg ${
                  paymentMethod === 'card'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300'
                }`}
              >
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`flex-1 p-4 border rounded-lg ${
                  paymentMethod === 'paypal'
                    ? 'border-black bg-gray-50'
                    : 'border-gray-300'
                }`}
              >
                PayPal
              </button>
            </div>
          </div>
  
          {paymentMethod === 'card' && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardData.cardNumber}
                  onChange={(e) =>
                    setCardData({ ...cardData, cardNumber: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
  
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name on Card
                </label>
                <input
                  type="text"
                  value={cardData.cardName}
                  onChange={(e) =>
                    setCardData({ ...cardData, cardName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
  
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardData.expiryDate}
                    onChange={(e) =>
                      setCardData({ ...cardData, expiryDate: e.target.value })
                    }
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
                    value={cardData.cvv}
                    onChange={(e) =>
                      setCardData({ ...cardData, cvv: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </>
          )}
  
          {paymentMethod === 'paypal' && (
            <div className="mb-6 text-center text-gray-600">
              You will be redirected to PayPal to complete your payment.
            </div>
          )}
  
          <button
            type="submit"
            className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors duration-200"
          >
            {paymentMethod === 'card' ? 'Place Order' : 'Continue to PayPal'}
          </button>
        </form>
      </div>
    );
  };

  export default PaymentDetails;