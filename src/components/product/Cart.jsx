import React from 'react';
import Navbar from '../navbar/Navbar';

const Cart = () => {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        {/* Cart items will go here */}
      </div>
    </>
  );
};

export default Cart;

