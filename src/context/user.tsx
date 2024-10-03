"use client";

import { postSignIn, postSignUp } from "@/app/lib/server/fetchUsers";
import {
  ILoginUser,
  IOrderResponse,
  IRegisterUser,
  IUser,
  IUserContextType,
  IUserResponse,
} from "@/interfaces/interfaces";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext<IUserContextType>({
  user: null,
  setUser: () => {},
  isLogged: false,
  setIsLogged: () => {},
  signIn: async () => false,
  signUp: async () => false,
  orders: [],
  logOut: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Partial<IUserResponse> | null>(null);
  const [isLogged, setIsLogged] = useState(false);
  const [orders, setOrders] = useState<IOrderResponse[]>([]);

  const signIn = async (credentials: ILoginUser) => {
    try {
      const data = await postSignIn(credentials);

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const signUp = async (user: IRegisterUser) => {
    try {
      const data = await postSignUp(user);
      if (data.id) {
        signIn({ email: user.email, password: user.password });
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  };


  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    setUser(null);
    setIsLogged(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogged(true);
    }
  }, [user]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      return;
    }
    setUser(null);
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        signIn,
        signUp,
        orders,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
