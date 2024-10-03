interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
}

interface ICredential {
  id: number;
  password: string;
}

interface IOrderResponse {
  id: number;
  status: string;
  date: Date;
  user: IUser;
  products: IProduct[];
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  credential: Credential;
  orders: IOrderResponse[];
}

interface ICreateCredential {
  password: string;
}

interface ICreateOrder {
  userId: number;
  products: number[];
}

interface ILoginUser {
  email: string;
  password: string;
}

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
}

interface IProductCardProps {
  product: IProduct;
  remove?: () => void;
}

interface IProductsGridProps {
  products: IProduct[];
}

interface ICartContextType {
  cartItems: IProduct[];
  addToCart: (product: number) => void;
  removeFromCart: (product: number) => void;
  total: number;
  proceedToCheckOut: () => void;
}

interface IUserResponse {
  login: boolean;
  user: Partial<IUser> | null;
  token: string;
}

interface IUserContextType {
  user: Partial<IUserResponse> | null;
  setUser: React.Dispatch<React.SetStateAction<Partial<IUserResponse> | null>>;
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  signIn: (credentials: ILoginUser) => Promise<boolean>;
  signUp: (user: IRegisterUser) => Promise<boolean>;
  orders: IOrderResponse[] | [];
  logOut: () => void;
}

export type {
  IProduct,
  IProductCardProps,
  IProductsGridProps,
  ICartContextType,
  IRegisterUser,
  ILoginUser,
  IUserContextType,
  IUserResponse,
  IUser,
  IOrderResponse,
};
