"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IOrderResponse } from "@/interfaces/interfaces";

const OrdersList = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<IOrderResponse[]>([]);

  const getOrders = async (token: any) => {
    try {
      const res = await fetch("http://localhost:5000/users/orders", {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      });
      const orders = await res.json();

      return orders;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const fetchData = async () => {
      const ordersFetched = await getOrders(token);
      setOrders(ordersFetched);
    };

    if (savedUser) {
      try {
        fetchData();
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    } else {
      router.push("/");
    }
  }, []);

  const [selectedOrder, setSelectedOrder] = useState<
    IOrderResponse | undefined
  >();

  const handleRowClick = (order: any) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = (e: any) => {
    if (e.target === e.currentTarget) {
      setSelectedOrder(undefined);
    }
  };

  // const handleDelete = (idToDelete: number) => {
  //   setOrders(orders.filter((e) => e.id !== idToDelete));
  //   setSelectedOrder(undefined);
  // };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-xl mx-auto mt-6 mb-6">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">
        My Orders
      </h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="flex justify-center">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
              <thead>
                <tr className="bg-gray-600 text-white uppercase text-sm leading-normal">
                  <th className="py-4 px-6 text-center">Order ID</th>
                  <th className="py-4 px-6 text-center">Date</th>
                  <th className="py-4 px-6 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 text-sm font-light">
                {Array.isArray(orders) &&
                  orders.map((order, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-300 hover:bg-indigo-100 transition duration-150 ease-in-out cursor-pointer"
                      onClick={() => handleRowClick(order)}
                    >
                      <td className="py-4 px-6 text-center whitespace-nowrap">
                        <span className="font-medium">{order.id}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        {new Date(order.date).toLocaleDateString()}
                      </td>
                      <td
                        className={`py-4 px-6 text-center font-semibold ${
                          order.status === "approved"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para detalles del pedido */}
      {selectedOrder && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseModal}
        >
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Order Details
            </h3>
            <p className="mb-2 text-gray-700">
              <strong className="font-medium">Order ID:</strong>{" "}
              {selectedOrder?.id}
            </p>
            <p className="mb-2 text-gray-700">
              <strong className="font-medium">Date:</strong>{" "}
              {selectedOrder?.date &&
                new Date(selectedOrder?.date).toLocaleString("es-ES", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
            </p>
            <p className="mb-4 text-gray-700">
              <strong className="font-medium">Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  selectedOrder?.status === "approved"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {selectedOrder?.status &&
                  selectedOrder?.status.charAt(0).toUpperCase() +
                    selectedOrder?.status.slice(1)}
              </span>
            </p>
            <h4 className="text-lg font-semibold mb-2">Products:</h4>
            {/* Contenedor para permitir scroll */}
            <div className="max-h-64 overflow-y-auto mb-4 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 scrollbar-thumb-rounded-full">
              <ul className="list-disc pl-5">
                {selectedOrder?.products.map((product, index) => (
                  <li
                    key={index}
                    className="flex items-center mb-2 text-gray-700"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="mr-2 object-contain"
                    />
                    <span>
                      {product.name} - ${product.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Calcular el total */}
            <p className="text-lg font-semibold text-gray-800">
              <strong>Total:</strong> $
              {selectedOrder?.products
                .reduce((acc, product) => acc + product.price, 0)
                .toFixed(2)}
            </p>

            <button
              className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-200"
              onClick={handleCloseModal}
            >
              Close
            </button>
            {/* <button
              className="mt-4 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
              onClick={() => handleDelete(selectedOrder.id)}
            >
              Delete
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
