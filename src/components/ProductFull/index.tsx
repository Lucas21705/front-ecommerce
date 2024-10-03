"use client";

import Image from "next/image";
import Link from "next/link";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function ProductFull() {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="" data-aos="fade-left">
      <div className=" text-center" data-aos="fade-up" data-aos-duration="500">
        <div className="text-black text-4xl p-3 pb-6 mt-3">
          <h1 className="font-bold mt-6 p-2">MacBook Air</h1>
          <h3>Super light. M3 Superchip.</h3>
        </div>
        <Link
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-3xl px-6 py-3 m-4 w-full md:w-auto"
          href="/home"
        >
          More Products
        </Link>
        <div className="relative h-96">
          <Image
            src="https://res.cloudinary.com/dirkgkblb/image/upload/v1726005051/macbook_air_mx__ez5y0k5yy7au_og-removebg-preview_u76bcw.png"
            alt="mac"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-contain"
          />
        </div>
      </div>

      {/* Card 2 */}
      <div
        className=" text-center bg-black"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <div className="text-white text-4xl p-3 pb-6 mt-3">
          <h1 className="font-bold mt-6 p-2">iPhone 15 Pro</h1>
          <h3>Titanium. So sturdy and light. So Pro</h3>
        </div>
        <Link
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-3xl px-6 py-3 m-4 w-full md:w-auto"
          href="/home"
        >
          More Products
        </Link>
        <div className="relative  h-96 mt-3">
          <Image
            src="https://res.cloudinary.com/dirkgkblb/image/upload/v1726008101/iphone-15-pro_overview__f8jz7aagka2q_og_gjsbht.png"
            alt="iphone"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-contain"
          />
        </div>
      </div>

      {/* Card 3 */}
      <div className=" text-center" data-aos="fade-up" data-aos-duration="500">
        <div className="text-black text-4xl p-3 pb-6 mt-3 ">
          <h1 className="font-bold ">WATCH</h1>
          <h2 className="text-red-600 ">SERIE 9</h2>
          <h3>More power to shine brighter.</h3>
        </div>
        <Link
          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-3xl px-6 py-3 m-4 w-full md:w-auto"
          href="/home"
        >
          More Products
        </Link>
        <div className=" relative  h-96  mt-4 ">
          <Image
            src="https://www.apple.com/co/watchos/watchos-10/images/meta/watchos-10__focovxashvm2_og.png"
            alt="watch"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={true}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductFull;
