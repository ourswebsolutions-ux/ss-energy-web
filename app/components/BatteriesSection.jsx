"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Zap, Layers } from "lucide-react";
import { sendToWhatsApp } from "../../lib/whatsappUtils"; // 👈 Relative Path Fix

// Solar & Tubular Battery Products Data with Category Tags
const batteryProducts = [
  {
    id: 1,
    title: "Narada 48V 100Ah 4.8kWh Lithium-ion Battery Pack (LifePO4)",
    originalPrice: "Rs.385,000.00",
    discountedPrice: "Rs.345,000.00",
    savings: "Save Rs.40,000.00",
    image: "/battery1.png",
    buttonText: "Pre-Order",
    category: "lithium",
  },
  {
    id: 2,
    title: "Phoenix Tall Tubular Battery TX-2500 (230Ah) Solar Deep Cycle",
    originalPrice: "Rs.68,000.00",
    discountedPrice: "Rs.58,500.00",
    savings: "Save Rs.9,500.00",
    image: "/battery2.png",
    buttonText: "Add To Cart",
    category: "tubular",
  },
  {
    id: 3,
    title: "AGS Tubular Battery IT-1800 Heavy Duty Deep Cycle Solar",
    originalPrice: "Rs.56,000.00",
    discountedPrice: "Rs.48,000.00",
    savings: "Save Rs.8,000.00",
    image: "/battery3.png",
    buttonText: "Add To Cart",
    category: "tubular",
  },
  {
    id: 4,
    title: "OSAKA Tubular Battery DL-2000 Super Deep Cycle Battery",
    originalPrice: "Rs.62,000.00",
    discountedPrice: "Rs.53,500.00",
    savings: "Save Rs.8,500.00",
    image: "/battery4.png",
    buttonText: "Add To Cart",
    category: "dry_gel",
  },
  {
    id: 5,
    title: "Inverex PowerWall 5.12kWh 100Ah Lithium Phosphate Battery",
    originalPrice: "Rs.410,000.00",
    discountedPrice: "Rs.365,000.00",
    savings: "Save Rs.45,000.00",
    image: "/battery5.png",
    buttonText: "Add To Cart",
    category: "lithium",
  },
];

// Right Side Mini Sub-Categories
const rightCategories = [
  {
    id: 1,
    key: "lithium",
    title: "Lithium-ion Batteries (48V)",
    image: "/battery-thumb1.png",
  },
  {
    id: 2,
    key: "tubular",
    title: "Tall Tubular Deep Cycle",
    image: "/battery-thumb2.png",
  },
  {
    id: 3,
    key: "dry_gel",
    title: "Dry & Gel Batteries",
    image: "/battery-thumb3.png",
  },
];

// Bottom 3 Promo Banners (Emerald Theme)
const bottomBanners = [
  {
    id: 1,
    title: "Lithium PowerWall",
    image: "/banner-lithium.png",
    gradient: "from-[#059669] via-[#10b981] to-[#34d399]",
    categoryKey: "lithium",
  },
  {
    id: 2,
    title: "Tall Tubular Series",
    image: "/banner-tubular.png",
    gradient: "from-[#047857] via-[#059669] to-[#10b981]",
    categoryKey: "tubular",
  },
  {
    id: 3,
    title: "Deep Cycle Solar",
    image: "/banner-deepcycle.png",
    gradient: "from-[#065f46] via-[#047857] to-[#059669]",
    categoryKey: "tubular",
  },
];

export default function BatteriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Active Category Filter ('all', 'lithium', 'tubular', 'dry_gel')
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter Products based on selected category
  const filteredProducts =
    activeCategory === "all"
      ? batteryProducts
      : batteryProducts.filter((p) => p.category === activeCategory);

  // Infinite slider array
  const extendedProducts = [...filteredProducts, ...filteredProducts];

  // Auto-Slide Logic
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

  // Category switch helper
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
        
        {/* 1. Top Marquee */}
        <div className="w-full overflow-hidden pb-4 mb-4">
          <div className="flex w-max gap-8 animate-battery-marquee items-center text-gray-800 text-sm font-semibold">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <span>Solar Batteries Special Discount</span>
                <Zap className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Header Title */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Solar & Tubular Batteries
            </h2>
            {activeCategory !== "all" && (
              <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full capitalize">
                {activeCategory.replace("_", " ")}
              </span>
            )}
          </div>

          {activeCategory !== "all" && (
            <button
              onClick={() => handleSelectCategory("all")}
              className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Layers size={14} /> Show All Products
            </button>
          )}
        </div>

        {/* 3. Top Main Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          
          {/* Left Large Banner */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#065f46] via-[#047857] to-[#10b981] rounded-xl p-6 flex flex-col justify-between text-white min-h-[380px] shadow-sm">
            <div>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90 mb-1 text-emerald-200">
                MAXIMUM BACKUP
              </p>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-wide text-yellow-300 drop-shadow">
                SOLAR BATTERIES
              </h3>
              <p className="text-sm mt-3 opacity-90">Long Lasting Power</p>
            </div>

            <div className="relative w-full h-44 mt-4">
              <Image
                src="/promo-batteries.png"
                alt="Solar Batteries Promo"
                fill
                unoptimized
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Middle Slider Section */}
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
                  transform: `translateX(calc(-${currentIndex} * var(--battery-slide-step)))`,
                }}
              >
                {extendedProducts.map((product, index) => (
                  <div
                    key={`${product.id}-${index}`}
                    className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 p-2"
                  >
                    <div className="h-full flex flex-col justify-between bg-white border border-gray-100 rounded-md p-2 hover:shadow-md transition-shadow relative">
                      
                      {/* Image */}
                      <div className="relative w-full aspect-square bg-emerald-50/40 rounded mb-3 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          unoptimized
                          className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Info & WhatsApp Action */}
                      <div className="flex flex-col flex-grow justify-between">
                        <div>
                          <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[32px]">
                            {product.title}
                          </h3>

                          <div className="flex items-baseline gap-1.5 flex-wrap mb-1">
                            <span className="text-[11px] text-gray-400 line-through">
                              {product.originalPrice}
                            </span>
                            <span className="text-xs font-bold text-emerald-700">
                              {product.discountedPrice}
                            </span>
                          </div>

                          <div className="inline-block bg-emerald-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded mb-3">
                            {product.savings}
                          </div>
                        </div>

                        {/* 🚀 WhatsApp Trigger */}
                        <button
                          onClick={() => sendToWhatsApp(product)}
                          className="w-full py-1.5 px-3 rounded-full border border-emerald-900 text-emerald-900 font-medium text-xs hover:bg-emerald-900 hover:text-white transition-colors duration-200 cursor-pointer"
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

          {/* Right Column Categories List */}
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
                        ? "bg-emerald-50/80 border-emerald-500 shadow-md"
                        : "bg-white border-gray-100 hover:shadow-md"
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isActive
                            ? "text-emerald-700"
                            : "text-gray-900 group-hover:text-emerald-600"
                        }`}
                      >
                        {cat.title}
                      </h4>
                      <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">
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

            {/* View All Button */}
            <div
              onClick={() => handleSelectCategory("all")}
              className={`rounded-xl p-4 flex items-center justify-center shadow-sm border cursor-pointer transition-all ${
                activeCategory === "all"
                  ? "bg-emerald-50 border-emerald-500 font-bold text-emerald-700 shadow-md"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="text-xs font-semibold">
                View all battery categories
              </span>
            </div>
          </div>

        </div>

        {/* 4. Bottom Banners */}
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
                {/* 🚀 Banner WhatsApp Trigger */}
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
          --battery-slide-step: 100%;
        }
        @media (min-width: 640px) {
          :root {
            --battery-slide-step: 50%;
          }
        }
        @media (min-width: 768px) {
          :root {
            --battery-slide-step: 33.333%;
          }
        }

        @keyframes batteryMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-battery-marquee {
          animation: batteryMarquee 20s linear infinite;
        }
        .animate-battery-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}