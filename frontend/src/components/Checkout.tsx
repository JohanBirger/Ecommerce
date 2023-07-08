import React from 'react';

interface CheckoutProps {
  totalPrice: string;
}

const CheckoutComponent: React.FC<CheckoutProps> = ({ totalPrice }) => {
  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log('Checkout clicked');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="flex items-center mb-4">
        <span className="text-500 text-black">Total:</span>
        <span className="text-500 text-black ml-2">${totalPrice}</span>
      </div>
      <button
        onClick={handleCheckout}
        className="btn-wide-action"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutComponent;