// In CheckoutForm.jsx
"use client"
import { useState } from "react";
import ConfirmationStep from "./ConfirmationStep";
import OrderSummary from "./OrderSummary";
import PaymentDetails from "./PaymentDetails";
import ShippingDetails from "./ShippingDetails";


export default function CheckoutForm() {
  const [step, setStep] = useState(1);
  const [checkoutData, setCheckoutData] = useState({});

  const handleShippingSubmit = (shippingData) => {
    setCheckoutData(prev => ({ ...prev, shipping: shippingData }));
    setStep(2);
  };

  const handlePaymentSubmit = (paymentData) => {
    setCheckoutData(prev => ({ ...prev, payment: paymentData }));
    setStep(3);
  };

  const handleOrderConfirm = () => {
    // Process the order
    console.log('Order data:', checkoutData);
    setStep(4);
  };

  return (
    <div>
      {step === 1 && <ShippingDetails onNext={handleShippingSubmit} />}
      {step === 2 && <PaymentDetails onNext={handlePaymentSubmit} />}
      {step === 3 && <OrderSummary onConfirm={handleOrderConfirm} />}
      {step === 4 && <ConfirmationStep />}
    </div>
  );
}