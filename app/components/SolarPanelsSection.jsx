"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { sendToWhatsApp } from "../../lib/whatsappUtils";
// Solar Panel Products Data
const solarProducts = [
  {
    id: 1,
    title: "Longi Hi-MO 6 Solar Panel 585W N-Type Mono PERC",
    originalPrice: "Rs.23,500.00",
    discountedPrice: "Rs.20,500.00",
    savings: "Save Rs.3,000.00",
    image: "/solar1.png",
    buttonText: "Add To Cart",
    category: "mono",
  },
  {
    id: 2,
    title: "Jinko Tiger Neo N-Type 575W Dual Glass Solar Module",
    originalPrice: "Rs.24,000.00",
    discountedPrice: "Rs.21,200.00",
    savings: "Save Rs.2,800.00",
    image: "/solar2.png",
    buttonText: "Add To Cart",
    category: "bifacial",
  },
  {
    id: 3,
    title: "JA Solar 550W Mono PERC Half-Cell High Efficiency Panel",
    originalPrice: "Rs.22,000.00",
    discountedPrice: "Rs.19,500.00",
    savings: "Save Rs.2,500.00",
    image: "/solar3.png",
    buttonText: "Add To Cart",
    category: "mono",
  },
  {
    id: 4,
    title: "Canadian Solar HiKu6 545W Mono-FACIAL Solar Board",
    originalPrice: "Rs.21,500.00",
    discountedPrice: "Rs.18,800.00",
    savings: "Save Rs.2,700.00",
    image: "/solar4.png",
    buttonText: "Add To Cart",
    category: "poly",
  },
  {
    id: 5,
    title: "Trina Solar Vertex N-Type 600W Ultra High Power Module",
    originalPrice: "Rs.26,000.00",
    discountedPrice: "Rs.22,800.00",
    savings: "Save Rs.3,200.00",
    image: "/solar5.png",
    buttonText: "Add To Cart",
    category: "bifacial",
  },
];

// Right Side Mini Sub-Categories
const rightCategories = [
  { id: 1, key: "mono", title: "Monocrystalline Panels", image: "/solar-thumb1.png" },
  { id: 2, key: "bifacial", title: "Bifacial Double Glass", image: "/solar-thumb2.png" },
  { id: 3, key: "poly", title: "Polycrystalline Series", image: "/solar-thumb3.png" },
];

// Bottom 3 Promo Banners
const bottomBanners = [
  {
    id: 1,
    title: "N-Type High Efficiency",
    image: "/banner-solar1.png",
    gradient: "from-[#0284c7] via-[#0369a1] to-[#075985]",
    categoryKey: "mono",
  },
  {
    id: 2,
    title: "Bifacial Dual Power",
    image: "/banner-solar2.png",
    gradient: "from-[#0369a1] via-[#075985] to-[#0c4a6e]",
    categoryKey: "bifacial",
  },
  {
    id: 3,
    title: "Commercial Grade Panels",
    image: "/banner-solar3.png",
    gradient: "from-[#0f172a] via-[#1e293b] to-[#334155]",
    categoryKey: "poly",
  },
];

export default function SolarPanelsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? solarProducts
      : solarProducts.filter((p) => p.category === activeCategory);

  const extendedProducts = [...filteredProducts, ...filteredProducts];

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000);
    return () => clearInterval(timer);
  }, [currentIndex, filteredProducts.length]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    if (currentIndex <= 0) {
      setIsTransitioning(false);
      setCurrentIndex(filteredProducts.length);
      setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex(filteredProducts.length - 1);
      }, 20);
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (currentIndex >= filteredProducts.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const handleSelectCategory = (catKey) => {
    setIsTransitioning(false);
    setActiveCategory(catKey);
    setCurrentIndex(0);
    setTimeout(() => {
      setIsTransitioning(true);
    }, 50);
  };

  return (
    <section className="w-full pt-6 pb-8 px-4 lg:px-8 bg-white overflow-hidden select-none">
      <div className="mx-auto max-w-[1600px]">

        {/* 1. Top Infinite Marquee */}
        <div className="w-full overflow-hidden pb-4 mb-4">
          <div className="flex w-max gap-8 animate-solar-marquee items-center text-gray-800 text-sm font-semibold">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <span>Solar Panels Special Discount</span>
                <Zap className="w-4 h-4 text-sky-600 fill-sky-600" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Header Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
          Solar Panels & Modules
        </h2>

        {/* 3. Top Main Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          
          {/* Left Large Promo Banner */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#075985] rounded-xl p-6 flex flex-col justify-between text-white min-h-[380px] shadow-sm">
            <div>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90 mb-1 text-sky-200">
                HIGH EFFICIENCY
              </p>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-wide text-amber-300 drop-shadow">
                SOLAR PANELS
              </h3>
              <p className="text-sm mt-3 opacity-90">Tier-1 Guaranteed Quality</p>
            </div>
            
            <div className="relative w-full h-44 mt-4">
              <Image
                src="/promo-solar.png"
                alt="Solar Panels Promo"
                fill
                unoptimized
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Middle Cards Slider */}
          <div className="lg:col-span-6 relative bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-gray-100 overflow-hidden">
            
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>

            <div className="overflow-hidden h-full">
              <div
                onTransitionEnd={handleTransitionEnd}
                className={`flex h-full ${
                  isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
                }`}
                style={{
                  transform: `translateX(calc(-${currentIndex} * var(--solar-slide-step)))`,
                }}
              >
                {extendedProducts.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 p-2"
                  >
                    <div className="h-full flex flex-col justify-between bg-white rounded-md p-2 hover:shadow-md transition-shadow">
                      {/* Product Image */}
                      <div className="relative w-full aspect-square bg-sky-50/50 rounded mb-3 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          unoptimized
                          className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info & Add to Cart */}
                      <div className="flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[32px]">
                            {product.title}
                          </h3>

                          <div className="flex items-baseline gap-1.5 flex-wrap mb-1">
                            <span className="text-[11px] text-gray-400 line-through">
                              {product.originalPrice}
                            </span>
                            <span className="text-xs font-bold text-sky-700">
                              {product.discountedPrice}
                            </span>
                          </div>

                          <div className="inline-block bg-sky-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded mb-3">
                            {product.savings}
                          </div>
                        </div>

                        {/* 🚀 Click Handler Call using lib function */}
                        <button
                          onClick={() => sendToWhatsApp(product)}
                          className="w-full py-1.5 px-3 rounded-full border border-sky-900 text-sky-900 font-medium text-xs hover:bg-sky-900 hover:text-white transition-colors duration-200 cursor-pointer"
                        >
                          {product.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sub-Categories */}
          <div className="lg:col-span-3 flex flex-col justify-between gap-3">
            <div className="flex flex-col gap-3">
              {rightCategories.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.key)}
                    className={`rounded-xl p-4 flex items-center justify-between shadow-sm border transition-all cursor-pointer group ${
                      isActive
                        ? "bg-sky-50/80 border-sky-500 shadow-md"
                        : "bg-white border-gray-100 hover:shadow-md"
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isActive
                            ? "text-sky-700"
                            : "text-gray-900 group-hover:text-sky-600"
                        }`}
                      >
                        {cat.title}
                      </h4>
                      <span className="text-xs text-gray-400 mt-1 inline-block">
                        Shop now
                      </span>
                    </div>

                    <div className="relative w-14 h-10 flex-shrink-0">
                      <Image
                        src={cat.image}
                        alt={cat.title}
                        fill
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              onClick={() => handleSelectCategory("all")}
              className={`rounded-xl p-4 flex items-center justify-center shadow-sm border cursor-pointer transition-colors ${
                activeCategory === "all"
                  ? "bg-sky-50 border-sky-500 font-bold text-sky-700"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="text-xs font-semibold">
                View all solar panel categories
              </span>
            </div>
          </div>

        </div>

        {/* 4. Bottom 3 Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottomBanners.map((banner) => (
            <div
              key={banner.id}
              className={`relative overflow-hidden bg-gradient-to-r ${banner.gradient} rounded-xl p-5 sm:p-6 text-white flex items-center justify-between min-h-[140px] shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="z-10 max-w-[60%]">
                <h3 className="text-lg sm:text-xl font-bold leading-tight mb-4">
                  {banner.title}
                </h3>
                {/* 🚀 Click Handler Call for Banner */}
                <button
                  onClick={() => sendToWhatsApp({ title: banner.title, category: banner.categoryKey })}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium px-4 py-1.5 rounded-full transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  Shop Now
                </button>
              </div>

              <div className="relative w-28 sm:w-36 h-24 z-10">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  fill
                  unoptimized
                  className="object-contain drop-shadow-md"
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      <style jsx global>{`
        :root {
          --solar-slide-step: 100%;
        }
        @media (min-width: 640px) {
          :root {
            --solar-slide-step: 50%;
          }
        }
        @media (min-width: 768px) {
          :root {
            --solar-slide-step: 33.333%;
          }
        }

        @keyframes solarMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-solar-marquee {
          animation: solarMarquee 20s linear infinite;
        }
        .animate-solar-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}