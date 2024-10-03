"use client";

import { useContext } from "react";
import { CartContext } from "@/context/cart";
import { UserContext } from "@/context/user";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function AddToCart({ id }: { id: number }) {
  const router = useRouter()
  const { addToCart } = useContext(CartContext);
  const { isLogged } = useContext(UserContext);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    if (!isLogged) {
       Swal.fire({
         title: "You need to be logged in to add items to the cart",
         text: "Do you want to register or log in?",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "SignIn/SignUp",
       }).then((result) => {
         if (result.isConfirmed) {
           router.push("/auth-page");
         }
       });
      // Swal.fire({
      //   title: "You need to be logged in to add items to the cart",
      //   icon: "warning",
      // });
      return;
    }
    addToCart(id);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Product added to cart",
    });
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-full text-base px-6 py-3 shadow-lg transform transition-transform hover:scale-105 flex justify-center items-center space-x-2 me-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M16 13l1.4 5M9 16h6m-6 0L7.6 19M15 16l1.4 3M9 16L7.6 19M15 16l1.4 3"
        />
      </svg>
      <span>Add to Cart</span>
    </button>
  );
}

export default AddToCart;
