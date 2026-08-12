"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Zap, Layers, ShoppingBag, ShieldCheck } from "lucide-react";
import { sendToWhatsApp } from "../../lib/whatsappUtils";

// Right Side Mini Sub-Categories
const rightCategories = [
  { id: 1, key: "hybrid", title: "Hybrid Inverters", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80" },
  { id: 2, key: "off_grid", title: "Off-Grid Inverters", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: 3, key: "on_grid", title: "On-Grid Inverters", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" },
];

// Bottom 3 Promo Banners
const bottomBanners = [
  {
    id: 1,
    title: "Off Grid Inverters",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=500&q=80",
    gradient: "from-[#ff5252] via-[#ff6b6b] to-[#ff7a59]",
    categoryKey: "off_grid",
  },
  {
    id: 2,
    title: "Hybrid Inverters",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&q=80",
    gradient: "from-[#e11d48] via-[#f43f5e] to-[#fb7185]",
    categoryKey: "hybrid",
  },
  {
    id: 3,
    title: "On Grid Inverters",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80",
    gradient: "from-[#be123c] via-[#e11d48] to-[#f43f5e]",
    categoryKey: "on_grid",
  },
];

export default function InvertersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch Inverter Products from Database ('inverters')
  useEffect(() => {
    async function fetchInverters() {
      try {
        setLoading(true);
        const res = await fetch("/api/products?section=inverters");
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        } else if (Array.isArray(json)) {
          setProducts(json);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch inverter products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchInverters();
  }, []);

  // Filter products based on selected category accurately
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => {
      const cat = (p.category || "").toLowerCase();
      const sec = (p.section || p.targetSection || "").toLowerCase();
      const type = (p.type || "").toLowerCase();
      const matchKey = activeCategory.toLowerCase();

      return cat.includes(matchKey) || sec.includes(matchKey) || type.includes(matchKey);
    });
  }, [products, activeCategory]);

  // Extended array for smooth infinite slider loop
  // Duplicate only when products > 2 (because 2 cards are visible on desktop)
  const extendedProducts = useMemo(() => {
    if (filteredProducts.length === 0) return [];
    
    // If 2 or fewer products, do not duplicate
    if (filteredProducts.length <= 2) {
      return filteredProducts;
    }
    
    return [...filteredProducts, ...filteredProducts];
  }, [filteredProducts]);

  // Auto-Slide Timer (10 Seconds)
  useEffect(() => {
    if (filteredProducts.length === 0) return;
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

  // Category Selection Handler
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
          <div className="flex w-max gap-8 animate-discount-marquee items-center text-gray-800 text-sm font-semibold">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <span>Solar Inverter Special Deals</span>
                <Zap className="w-4 h-4 text-red-600 fill-red-600" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. Header Title */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Inverters
            </h2>
            {activeCategory !== "all" && (
              <span className="text-xs bg-red-100 text-red-800 font-semibold px-2.5 py-0.5 rounded-full capitalize">
                {activeCategory.replace("_", " ")}
              </span>
            )}
          </div>

          {activeCategory !== "all" && (
            <button
              onClick={() => handleSelectCategory("all")}
              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer flex items-center gap-1"
            >
              <Layers size={14} /> Show All Inverters
            </button>
          )}
        </div>

        {/* 3. Main Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          
          {/* Left Large Promo Banner */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#ff6b6b] via-[#ff5252] to-[#ff758c] rounded-xl p-6 flex flex-col justify-between text-white min-h-[420px] shadow-sm">
            <div>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90 mb-1 text-red-100">
                SOLAR INVERTERS
              </p>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-wide text-white drop-shadow">
                BEST PRICES
              </h3>
              <p className="text-sm mt-3 opacity-90">Exclusive deals & warranties</p>
            </div>
            
            <div className="relative w-full h-48 mt-4">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
                alt="Solar Inverters Promo"
                fill
                unoptimized
                className="object-contain drop-shadow-lg"
              />
            </div>
          </div>

          {/* Middle Dynamic Cards Slider */}
          <div className="lg:col-span-6 relative bg-white rounded-xl p-2 sm:p-3 shadow-xs border border-gray-100 min-h-[420px] flex flex-col justify-center">
            
            {loading ? (
              <div className="text-center py-12 text-sm text-gray-500 font-medium">
                Loading inverters from database...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-500 font-medium">
                No inverter products found for this category.
              </div>
            ) : (
              <div className="relative w-full overflow-hidden">
                
                {/* Navigation Buttons */}
                <button
                  onClick={handlePrev}
                  aria-label="Previous"
                  className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/95 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next"
                  className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/95 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all cursor-pointer"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Sliding Viewport Track */}
                <div className="w-full overflow-hidden px-1">
                  <div
                    onTransitionEnd={handleTransitionEnd}
                    className={`flex ${
                      isTransitioning ? "transition-transform duration-500 ease-in-out" : ""
                    }`}
                    style={{
                      // 2 cards visible on desktop → move by 50% each step
                      transform: `translateX(-${currentIndex * 50}%)`,
                    }}
                  >
                    {extendedProducts.map((product, idx) => {
                      // Safe numeric extraction only for savings calculation
                      const origNum = parseInt(String(product.originalPrice || "").replace(/\D/g, ""), 10) || 0;
                      const discNum = parseInt(String(product.discountedPrice || "").replace(/\D/g, ""), 10) || 0;
                      const calculatedSavings = origNum > discNum ? `Save Rs.${(origNum - discNum).toLocaleString()}` : null;
                      const savingsText = product.savings || calculatedSavings;

                      return (
                        <div
                          key={`${product.id || product._id || "inverter"}-${idx}`}
                          // Mobile: 1 card (100%)
                          // Tablet+: 2 cards (50%)
                          className="w-full sm:w-1/2 flex-shrink-0 px-1.5"
                        >
                          {/* Card UI */}
                          <div className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-shadow relative">
                            
                            <div>
                              {/* Image Box */}
                              <div className="relative w-full h-44 bg-[#f8fafc] rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                                {product.badgeText && (
                                  <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wide">
                                    {product.badgeText}
                                  </span>
                                )}

                                <Image
                                  src={product.image || "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80"}
                                  alt={product.title || "Inverter"}
                                  fill
                                  unoptimized
                                  className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              {/* Category Tag */}
                              {(product.category || product.targetSection) && (
                                <div className="mb-1.5">
                                  <span className="inline-block bg-[#f1f5f9] text-[#64748b] text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                                    {product.category || product.targetSection}
                                  </span>
                                </div>
                              )}

                              {/* Title */}
                              <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-0.5">
                                {product.title || "Product Title"}
                              </h3>

                              {/* Description */}
                              {product.description && (
                                <p className="text-[12px] text-gray-500 line-clamp-1 mb-2">
                                  {product.description}
                                </p>
                              )}

                              {/* Specs + Warranty */}
                              {(product.specs || product.warranty) && (
                                <div className="mb-3 flex flex-wrap gap-1.5">
                                  {product.specs && (
                                    <span className="inline-flex items-center gap-1 bg-[#fffbeb] border border-[#fde68a] text-[#b45309] text-[11px] font-medium px-2 py-0.5 rounded-md">
                                      <ShieldCheck size={12} className="text-[#d97706]" />
                                      <span className="truncate">{product.specs}</span>
                                    </span>
                                  )}
                                  {product.warranty && (
                                    <span className="inline-flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
                                      🛡️ {product.warranty}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>

                            <div>
                              {/* Price – display the original strings from Admin */}
                              <div className="flex items-baseline gap-2 mb-0.5">
                                {product.originalPrice && (
                                  <span className="text-xs text-gray-400 line-through font-medium">
                                    {product.originalPrice}
                                  </span>
                                )}
                                <span className="text-base font-extrabold text-gray-900">
                                  {product.discountedPrice || "N/A"}
                                </span>
                              </div>

                              {/* Save Amount */}
                              {savingsText && (
                                <p className="text-[11px] font-bold text-red-600 mb-2">
                                  {savingsText}
                                </p>
                              )}

                              {/* Stock status */}
                              {typeof product.inStock === "boolean" && (
                                <p className={`text-[11px] font-semibold mb-2 ${product.inStock ? "text-emerald-600" : "text-red-600"}`}>
                                  {product.inStock ? "In Stock" : "Out of Stock"}
                                </p>
                              )}

                              {/* Action Button – exact same color as Admin Live Preview for inverters */}
                              <button
                                onClick={() => sendToWhatsApp(product)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                              >
                                <ShoppingBag size={14} />
                                <span>{product.buttonText || "Add To Cart"}</span>
                              </button>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

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
                    className={`rounded-xl p-4 flex items-center justify-between shadow-xs border transition-all cursor-pointer group ${
                      isActive
                        ? "bg-red-50/80 border-red-500 shadow-sm"
                        : "bg-white border-gray-100 hover:shadow-xs"
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isActive
                            ? "text-red-600"
                            : "text-gray-900 group-hover:text-red-600"
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

            {/* View All Categories Button */}
            <div
              onClick={() => handleSelectCategory("all")}
              className={`rounded-xl p-4 flex items-center justify-center shadow-xs border cursor-pointer transition-colors ${
                activeCategory === "all"
                  ? "bg-red-600 text-white border-red-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="text-xs font-semibold">
                View all inverter categories
              </span>
            </div>

          </div>

        </div>

        {/* 4. Bottom 3 Gradient Banners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bottomBanners.map((banner) => (
            <div
              key={banner.id}
              className={`relative overflow-hidden bg-gradient-to-r ${banner.gradient} rounded-xl p-5 sm:p-6 text-white flex items-center justify-between min-h-[140px] shadow-xs hover:shadow-sm transition-shadow`}
            >
              <div className="z-10 max-w-[60%]">
                <h3 className="text-lg sm:text-xl font-bold leading-tight mb-4">
                  {banner.title}
                </h3>
                <button
                  onClick={() =>
                    sendToWhatsApp({
                      title: banner.title,
                      category: banner.categoryKey,
                    })
                  }
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
    </section>
  );
}