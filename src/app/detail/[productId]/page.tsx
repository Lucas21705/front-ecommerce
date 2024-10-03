import Image from "next/image";
import { useContext } from "react";
import { fetchProductById } from "@/app/lib/server/fetchProducts";
import AddToCart from "@/components/AddToCart";
import Link from "next/link";

async function ProductDetail({ params }: { params: { productId: string } }) {
  const product = await fetchProductById(params.productId);

  return (
    <div className="mt-6">
      <Link href="/home" className="bg-black ml-4 p-3 rounded-2xl text-white">
        Back to Products
      </Link>

      <div className="mt-6 mb-6 max-w-sm lg:max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg  mx-auto lg:flex lg:flex-row lg:items-center">
        <div className="lg:w-1/2 group">
          <Image
            className="w-full h-auto rounded-t-lg lg:rounded-tl-lg lg:rounded-br-none object-cover p-4 transition-transform duration-300 group-hover:scale-105"
            src={product.image}
            alt={product.name}
            width={1000}
            height={300}
          />
        </div>
        <div className="px-6 py-4 lg:w-1/2 lg:pl-8">
          <h5 className="text-xl font-bold tracking-tight text-gray-900">
            {product?.name}
          </h5>
          <div className="flex items-center mt-2 mb-4">
            <div className="flex items-center space-x-1">
              {/* Estrellas */}
              {Array.from({ length: 5 }, (_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
              ))}
            </div>

            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
              5.0
            </span>

            <h1
              className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2
            py-0.5 rounded dark:bg-gray-700 dark:text-white"
            >
              {" "}
              Stock: {product.stock}
            </h1>
          </div>
          <p className="text-gray-700 text-base mb-4">{product?.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 ">
              ${product?.price}
            </span>

            <AddToCart id={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
