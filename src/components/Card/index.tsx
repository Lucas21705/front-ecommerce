import Image from "next/image";
import { IProductCardProps } from "@/interfaces/interfaces";

import Link from "next/link";

function ProductCard({ product }: IProductCardProps) {
  return (
    <Link
      className="flex flex-col items-center text-center bg-gray-100 border border-gray-200 rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-300 transition-all duration-300 transform hover:scale-105"
      href={`/detail/${product.id}`}
    >
      <div className="relative object-contain m-6 w-32 h-24 rounded-t-lg md:h-48 md:w-48 md:rounded-none md:rounded-s-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true}
        />
      </div>
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-black  ">
          {product.name}
        </h2>
        <p className="mb-3 font-normal text-black">$ {product.price}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
