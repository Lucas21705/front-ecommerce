"use client";

import { postSignUp } from "@/app/lib/server/fetchUsers";
import { validateSignup } from "@/app/utils/validation";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { UserContext } from "@/context/user";
import Swal from "sweetalert2";

function SignUpForm() {
  const router = useRouter();
  const { signUp } = useContext(UserContext);
  const [signupValues, setSignupValues] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({} as { [key: string]: string });
  const [touched, setTouched] = useState({} as { [key: string]: boolean });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupValues({ ...signupValues, [name]: value });

    // Validar el campo actualizado
    setErrors(validateSignup({ ...signupValues, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    // Validar al perder el foco
    setErrors(validateSignup(signupValues));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await signUp(signupValues);
    if (success) {
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
        title: "User Registered successfully",
      });
      router.push("/home");
    } else {
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
        icon: "error",
        title: "Invalid User",
      });
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      {/** Email field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
          Email Address
        </label>
        {touched.email && errors.email && (
          <span className="text-red-500 text-xs mt-1">{errors.email}</span>
        )}
      </div>

      {/** Password field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
          Password
        </label>
        {touched.password && errors.password && (
          <span className="text-red-500 text-xs mt-1">{errors.password}</span>
        )}
      </div>

      {/** Name field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
          Name
        </label>
        {touched.name && errors.name && (
          <span className="text-red-500 text-xs mt-1">{errors.name}</span>
        )}
      </div>

      {/** Phone field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="tel"
          name="phone"
          id="phone"
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
          Phone Number
        </label>
        {touched.phone && errors.phone && (
          <span className="text-red-500 text-xs mt-1">{errors.phone}</span>
        )}
      </div>

      {/** Address field */}
      <div className="relative z-0 w-full mb-6 group">
        <input
          type="text"
          name="address"
          id="address"
          onChange={handleChange}
          onBlur={handleBlur}
          className="block py-3 px-2 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6">
          Address
        </label>
        {touched.address && errors.address && (
          <span className="text-red-500 text-xs mt-1">{errors.address}</span>
        )}
      </div>

      {/** Submit button */}
      <button
        type="submit"
        disabled={Object.keys(errors).length > 0}
        className="w-full py-3 px-5 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm font-medium transition"
      >
        Submit
      </button>
    </form>
  );
}

export default SignUpForm;
