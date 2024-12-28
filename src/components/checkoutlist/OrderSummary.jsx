// OrderSummary.jsx
const OrderSummary = ({ 
    items = [], 
    subtotal = 0,
    shipping = 0,
    tax = 0,
    total = 0,
    onConfirm 
  }) => {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
        
        <div className="border border-gray-200 rounded-lg p-6 mb-6">
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="py-4 flex items-center">
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
                    Qty {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
  
          <div className="mt-6 space-y-4">
            <div className="flex justify-between text-base text-gray-600">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base text-gray-600">
              <p>Shipping</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base text-gray-600">
              <p>Tax</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-lg font-medium">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </div>
  
        <button
          onClick={onConfirm}
          className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition-colors duration-200"
        >
          Confirm Order
        </button>
      </div>
    );
  };
  
  export default OrderSummary;