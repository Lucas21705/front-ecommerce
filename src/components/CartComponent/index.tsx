"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart";
import CartItem from "../CartItem";
import Swal from "sweetalert2";

function CartComponent() {
  const { cartItems, removeFromCart, total, proceedToCheckOut } =
    useContext(CartContext);

  const handlePurchase = () => {
    Swal.fire({
      title: "Complete purchase?",
      text: "Complete purchase and go to pay?",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        proceedToCheckOut();
        Swal.fire({
          title: "Purchase completed!",
          text: "Your purchase has been shipped.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="flex flex-col text-center justify-between w-full">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="border-b border-gray-200 py-4 flex flex-col md:flex-row items-center justify-between"
          >
            <CartItem product={item} remove={() => removeFromCart(item.id)} />
          </div>
        ))
      ) : (
        <div className="text-2xl font-bold text-gray-600 pt-8 flex flex-col items-center">
          <p>No items in cart</p>
          <p className="text-4xl mt-4">😢</p>
        </div>
      )}
      {total > 0 && (
        <div className="w-full flex flex-col items-center md:items-end pt-6 border-t border-gray-300">
          <div className="text-2xl font-bold mb-4">
            <p>
              Total: $<span className="text-black">{total}</span>
            </p>
          </div>
          <button
            className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-base px-6 py-3 shadow-lg transform transition-transform hover:scale-105 flex justify-center items-center space-x-2 me-2"
            onClick={handlePurchase}
          >
            Purchase
          </button>
        </div>
      )}
    </div>
  );
}

export default CartComponent;
