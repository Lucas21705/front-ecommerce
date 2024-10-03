"use client";

import { fetchProductById } from "@/app/lib/server/fetchProducts";
import { ICartContextType, IProduct } from "@/interfaces/interfaces";
import { Children, createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const addItem = async (
  cartItems: IProduct[],
  product: number
): Promise<IProduct[]> => {
  const existingProduct = cartItems.find((item) => item.id === product);
  if (existingProduct) {
    return [...cartItems, existingProduct];
  }
  const data = await fetchProductById(product.toString());
  return [...cartItems, data];
};

const removeItem = (cartItems: IProduct[], product: number) => {
  return cartItems.filter((item) => item.id !== product);
};

export const CartContext = createContext<ICartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  total: 0,
  proceedToCheckOut: () => {},
});

const checkout = async (cartItems: IProduct[]) => {
  try {
    const products = cartItems.map((item) => item.id);
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ products }),
    });
    if (response.ok) {
      console.log("success");
    } else {
      console.log("error");
      Swal.fire({
        title: "Purchase error!",
        text: "An error has occurred in the purchase.",
        icon: "error",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [total, setTotal] = useState(0);

  const addToCart = async (product: number) => {
    const updatedCart = await addItem(cartItems, product);
    setCartItems(updatedCart);
  };

  const removeFromCart = (product: number) => {
    setCartItems(removeItem(cartItems, product));
  };

  const proceedToCheckOut = () => {
    checkout(cartItems);
    setCartItems([]);
  };

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.price, 0);
    setTotal(total);

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, total, addToCart, removeFromCart, proceedToCheckOut }}
    >
      {children}
    </CartContext.Provider>
  );
};
