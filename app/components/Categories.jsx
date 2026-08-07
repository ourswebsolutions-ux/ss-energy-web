"use client";

import React from "react";
import Image from "next/image";

// Corrected relative image paths for Next.js public folder
const categories = [
  {
    id: 1,
    name: "VA Protectors",
    image: "/va.png",
  },
  {
    id: 2,
    name: "Solar Panels",
    image: "/Solar_Panels-removebg-preview.png",
  },
  {
    id: 3,
    name: "Lithium Batteries",
    image: "/lithium.png",
  },
  {
    id: 4,
    name: "Hybrid Systems",
    image: "/Hybrid_Systems-removebg-preview.png",
  },
 
  {
    id: 6,
    name: "Solar Batteries",
    image: "/Solar_Batteries-removebg-preview.png",
  },
  
  {
    id: 7,
    name: "Solar Inverters",
    image: "/Solar_Inverters-removebg-preview.png",
  },
];

export default function CategoriesSection() {
  return (
    <section className="w-full py-6 px-4 lg:px-8 bg-gray-50 overflow-hidden bg-gray-100">
      <div className="mx-auto max-w-[1600px]">
{/* 1. Top Banner Image */}
<div className="w-full mb-8 flex justify-center">
  <div className="relative w-full max-w-[1600px] h-[120px] sm:h-[160px] md:h-[200px] lg:h-[240px]">
    <Image
      src="/Frame_22.png"
      alt="Buy With Confidence - Best Prices with 7 Days Return Policy"
      fill
      priority
      className="object-contain"
    />
  </div>
</div>

        {/* 2. Shop By Categories Header */}
        <div className="flex items-center justify-between mb-6 px-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Shop By Categories
          </h2>
          <a
            href="#"
            className="text-sm sm:text-base font-semibold text-gray-700 underline hover:text-[#ff8615] transition-colors"
          >
            View all
          </a>
        </div>

        {/* 3. Marquee Infinite Slider */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max gap-6 sm:gap-10 animate-marquee-reverse">
            
            {[...categories, ...categories].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex flex-col items-center group cursor-pointer w-[130px] sm:w-[160px] lg:w-[180px] flex-shrink-0"
              >
                {/* Round Category Image Container */}
                <div className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] lg:w-[170px] lg:h-[170px] rounded-full bg-white shadow-sm border border-gray-100 p-4 flex items-center justify-center group-hover:shadow-md transition-shadow">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={140}
                    height={140}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Category Label */}
                <span className="mt-3 text-sm sm:text-base font-semibold text-gray-800 text-center group-hover:text-[#ff8615] transition-colors">
                  {item.name}
                </span>
              </div>
            ))}

          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes marqueeReverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-reverse {
          animation: marqueeReverse 25s linear infinite;
        }
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}