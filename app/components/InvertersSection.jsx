"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Zap, Star, Heart } from "lucide-react";

// Main Slider Products Data with Category Tags
const inverterProducts = [
  {
    id: 1,
    title: "GoodWe ES Uniq GW8000M-ES-C10 8kw Hybrid Solar Inverter...",
    originalPrice: "Rs.340,000.00",
    discountedPrice: "Rs.310,000.00",
    savings: "Save Rs.30,000.00",
    image: "/inverter1.png",
    buttonText: "Pre-Order",
    category: "2.5-10kw",
    type: "hybrid",
  },
  {
    id: 2,
    title: "Inverex Nitrox 10KW - 48V Hybrid Solar Inverter (Single Phase) PV...",
    originalPrice: "Rs.529,000.00",
    discountedPrice: "Rs.465,000.00",
    savings: "Save Rs.64,000.00",
    image: "/inverter2.png",
    buttonText: "Add To Cart",
    category: "ip65",
    type: "hybrid",
  },
  {
    id: 3,
    title: "PRIMAX NEXA PSE-DUAL-8KW - HYBRID SOLAR INVERTER",
    originalPrice: "Rs.425,000.00",
    discountedPrice: "Rs.310,000.00",
    savings: "Save Rs.115,000.00",
    image: "/inverter3.png",
    buttonText: "Add To Cart",
    category: "2.5-10kw",
    type: "hybrid",
  },
  {
    id: 4,
    title: "Crown Elego 3.2KW 24V MPPT Solar Inverter Dual Output",
    originalPrice: "Rs.135,000.00",
    discountedPrice: "Rs.118,500.00",
    savings: "Save Rs.16,500.00",
    image: "/inverter4.png",
    buttonText: "Add To Cart",
    category: "2.5-10kw",
    type: "offgrid",
  },
  {
    id: 5,
    title: "Fronus Platinum 6.2KW Hybrid Dual Output MPPT Solar Inverter",
    originalPrice: "Rs.185,000.00",
    discountedPrice: "Rs.162,000.00",
    savings: "Save Rs.23,000.00",
    image: "/inverter5.png",
    buttonText: "Add To Cart",
    category: "2.5-10kw",
    type: "ongrid",
  },
  {
    id: 6,
    title: "Inverex Aerox 1.2KW 12V Solar Inverter UPS",
    originalPrice: "Rs.65,000.00",
    discountedPrice: "Rs.58,000.00",
    savings: "Save Rs.7,000.00",
    image: "/inverter1.png",
    buttonText: "Add To Cart",
    category: "1-2kw",
    type: "offgrid",
  },
];

// Right Side Mini Sub-Categories
const rightCategories = [
  {
    id: 1,
    key: "1-2kw",
    title: "Solar Inverter 1-2Kw",
    image: "/inverter-thumb1.png",
  },
  {
    id: 2,
    key: "2.5-10kw",
    title: "Solar Inverter 2.5-10Kw",
    image: "/inverter-thumb2.png",
  },
  {
    id: 3,
    key: "ip65",
    title: "IP 65 Hybrid Inverters",
    image: "/inverter-thumb3.png",
  },
];

// Bottom 3 Promo Banners
const bottomBanners = [
  {
    id: 1,
    key: "offgrid",
    title: "Off Grid Inverters",
    image: "/banner-offgrid.png",
  },
  {
    id: 2,
    key: "hybrid",
    title: "Hybrid Inverters",
    image: "/banner-hybrid.png",
  },
  {
    id: 3,
    key: "ongrid",
    title: "On Grid Inverters",
    image: "/banner-ongrid.png",
  },
];

export default function InvertersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Filter State ('all', '1-2kw', '2.5-10kw', 'ip65', 'offgrid', 'hybrid', 'ongrid')
  const [activeCategory, setActiveCategory] = useState("all");

  // Favorites state array for selected heart items
  const [favorites, setFavorites] = useState([]);

  // Filter products based on selected category or show ALL cards
  const filteredProducts =
    activeCategory === "all"
      ? inverterProducts
      : inverterProducts.filter(
          (p) => p.category === activeCategory || p.type === activeCategory
        );

  // Extended array for smooth infinite slider loop
  const extendedProducts = [...filteredProducts, ...filteredProducts];

  // Auto-Slide 10 Seconds
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

  // Toggle Favourite Status
  const toggleFavorite = (productId, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Category Selection Handler (Reset to index 0 on change)
  const handleSelectCategory = (catKey) => {
    setIsTransitioning(false);
    setActiveCategory(catKey);
    setCurrentIndex(0);
    setTimeout(() => {
      setIsTransitioning(true);
    }, 50);
  };

  return (
    <section className="w-full pt-6 pb-8 px-4 lg:px-8 bg-gray-100 overflow-hidden select-none">
      <div className="mx-auto max-w-[1600px]">

        {/* 1. Top "Special Discount" Infinite Marquee */}
        <div className="w-full overflow-hidden pb-4 mb-4">
          <div className="flex w-max gap-8 animate-discount-marquee items-center text-gray-800 text-sm font-semibold">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <span>Special Discount</span>
                <Zap className="w-4 h-4 text-black fill-black" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Header Title */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Solar Inverters
          </h2>
          {activeCategory !== "all" && (
            <button
              onClick={() => handleSelectCategory("all")}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              Show All Inverters
            </button>
          )}
        </div>

        {/* 3. Top Main Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          
          {/* Left Large Promo Banner */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#ff6b6b] via-[#ff5252] to-[#ff758c] rounded-xl p-6 flex flex-col justify-between text-white min-h-[380px] shadow-sm">
            <div>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90 mb-1">
                SOLAR INVERTERS
              </p>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-wide text-yellow-300 drop-shadow">
                BEST PRICES
              </h3>
              <p className="text-sm mt-3 opacity-90">Exclusive deals</p>
            </div>
            
            <div className="relative w-full h-44 mt-4">
              <Image
                src="/promo-inverters.png"
                alt="Solar Inverters Promo"
                fill
                unoptimized
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Middle Cards Slider */}
          <div className="lg:col-span-6 relative bg-white rounded-xl p-2 sm:p-3 shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              aria-label="Previous"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all"
            >
              <ChevronRight size={20} />
            </button>

            {/* Slide Track */}
            <div className="overflow-hidden h-full">
              <div
                onTransitionEnd={handleTransitionEnd}
                className={`flex h-full ${
                  isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
                }`}
                style={{
                  transform: `translateX(calc(-${currentIndex} * var(--main-slide-step)))`,
                }}
              >
                {extendedProducts.map((product, index) => {
                  const isFav = favorites.includes(product.id);
                  return (
                    <div
                      key={`${product.id}-${index}`}
                      className="w-full sm:w-1/2 md:w-1/3 flex-shrink-0 p-2"
                    >
                      <div className="h-full flex flex-col justify-between bg-white rounded-md p-2 hover:shadow-md transition-shadow relative">
                        
                        {/* CARD TOP BAR: 5 Stars Left & Heart Right */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }).map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                size={12}
                                className="text-amber-400 fill-amber-400"
                              />
                            ))}
                          </div>

                          <button
                            onClick={(e) => toggleFavorite(product.id, e)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Favorite"
                          >
                            <Heart
                              size={16}
                              className={isFav ? "text-red-500 fill-red-500" : "text-gray-400"}
                            />
                          </button>
                        </div>

                        {/* Image */}
                        <div className="relative w-full aspect-square bg-gray-50 rounded mb-3 flex items-center justify-center">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            unoptimized
                            className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col flex-grow justify-between">
                          <div>
                            <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-snug mb-2 min-h-[32px]">
                              {product.title}
                            </h3>

                            <div className="flex items-baseline gap-1.5 flex-wrap mb-1">
                              <span className="text-[11px] text-gray-400 line-through">
                                {product.originalPrice}
                              </span>
                              <span className="text-xs font-bold text-red-600">
                                {product.discountedPrice}
                              </span>
                            </div>

                            <div className="inline-block bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded mb-3">
                              {product.savings}
                            </div>
                          </div>

                          <button className="w-full py-1.5 px-3 rounded-full border border-gray-800 text-gray-900 font-medium text-xs hover:bg-gray-900 hover:text-white transition-colors duration-200">
                            {product.buttonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column Sub-Categories List */}
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
                        ? "bg-red-50/80 border-red-400 shadow-md"
                        : "bg-white border-gray-100 hover:shadow-md"
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isActive
                            ? "text-red-600"
                            : "text-gray-900 group-hover:text-[#ff6b6b]"
                        }`}
                      >
                        {cat.title}
                      </h4>
                      <span className="text-xs text-red-600 font-medium mt-1 inline-block">
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

            {/* View All Categories Button (Show all cards in slider) */}
            <div
              onClick={() => handleSelectCategory("all")}
              className={`rounded-xl p-4 flex items-center justify-center shadow-sm border cursor-pointer transition-colors ${
                activeCategory === "all"
                  ? "bg-red-600 text-white border-red-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="text-xs font-semibold">
                View all categories
              </span>
            </div>

          </div>

        </div>

        {/* 4. Bottom 3 Gradient Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottomBanners.map((banner) => (
            <div
              key={banner.id}
              className="relative overflow-hidden bg-gradient-to-r from-[#ff5252] via-[#ff6b6b] to-[#ff7a59] rounded-xl p-5 sm:p-6 text-white flex items-center justify-between min-h-[140px] shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="z-10 max-w-[60%]">
                <h3 className="text-lg sm:text-xl font-bold leading-tight mb-4">
                  {banner.title}
                </h3>
                <button
                  onClick={() => handleSelectCategory(banner.key)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-medium px-4 py-1.5 rounded-full transition-colors inline-flex items-center gap-1"
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

      {/* Dynamic slide step & Marquee animation */}
      <style jsx global>{`
        :root {
          --main-slide-step: 100%;
        }
        @media (min-width: 640px) {
          :root {
            --main-slide-step: 50%;
          }
        }
        @media (min-width: 768px) {
          :root {
            --main-slide-step: 33.333%;
          }
        }

        @keyframes discountMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-discount-marquee {
          animation: discountMarquee 20s linear infinite;
        }
        .animate-discount-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}