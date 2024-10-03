"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { IUser } from "@/interfaces/interfaces";

function UserDashboard() {
  const { isLogged, logOut } = useContext(UserContext);
  const router = useRouter();
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUserData(JSON.parse(storedUser));
      }
    }
  }, []);

 const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
   e.preventDefault();
   Swal.fire({
     title: "Do you want to log out?",
     text: "If you log out, you will have to log in again.",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
     cancelButtonColor: "#d33",
     confirmButtonText: "Yes, log out.",
   }).then((result) => {
     if (result.isConfirmed) {
       Swal.fire({
         title: "Logged out!",
         text: "You have been successfully logged out.",
         icon: "success",
       });
       logOut();
       router.push("/"); 
     }
   });
 };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100">
      {isLogged ? (
        <div className="w-full max-w-md bg-white p-10 shadow-2xl rounded-lg border border-gray-200">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
            My Account
          </h1>

          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">
              Welcome, {userData?.user?.name}
            </h2>
            <p className="text-gray-600 mb-1">Email: {userData?.user?.email}</p>
            <p className="text-gray-600">
              Shipping address: {userData?.user?.address}
            </p>
            <p className="text-gray-600">
              Phone: {userData?.user?.phone}
            </p>
          </div>

          <Link
            href="/user-dashboard/orders"
            className="block text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg w-full px-6 py-3 text-center mb-6 transition-transform transform hover:scale-105"
          >
            My Orders
          </Link>

          <button
            type="submit"
            onClick={handleLogout}
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-semibold rounded-lg text-lg w-full px-6 py-3 text-center transition-transform transform hover:scale-105"
          >
            Log Out
          </button>
        </div>
      ) : (
        <Link
          href="/auth-page"
          className="text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg px-8 py-4 mt-8 transition-transform transform hover:scale-105"
        >
          Sign In / Sign Up
        </Link>
      )}
    </div>
  );
}

export default UserDashboard;
