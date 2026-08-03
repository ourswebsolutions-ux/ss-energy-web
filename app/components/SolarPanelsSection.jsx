"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Zap, Layers, ShoppingBag, ShieldCheck } from "lucide-react";
import { sendToWhatsApp } from "../../lib/whatsappUtils";

const rightCategories = [
  { id: 1, key: "mono", title: "Monocrystalline Panels", image: "/solar-thumb1.png" },
  { id: 2, key: "bifacial", title: "Bifacial Double Glass", image: "/solar-thumb2.png" },
  { id: 3, key: "poly", title: "Polycrystalline Series", image: "/solar-thumb3.png" },
];

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  // Fetch products from database ('panels')
  useEffect(() => {
    async function fetchSolarPanels() {
      try {
        setLoading(true);
        const res = await fetch("/api/products?section=panels");
        const json = await res.json();

        if (json.success && Array.isArray(json.data)) {
          setProducts(json.data);
        } else if (Array.isArray(json)) {
          setProducts(json);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Failed to fetch solar panel products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSolarPanels();
  }, []);

  // Filter products based on selected category
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
// صرف تب ڈپلیکیٹ کریں جب پروڈکٹس 3 سے زیادہ ہوں (کیونکہ ایک وقت میں 3 کارڈ دکھتے ہیں)
const extendedProducts = useMemo(() => {
  if (filteredProducts.length === 0) return [];
  
  // اگر 3 یا اس سے کم پروڈکٹس ہیں تو ڈپلیکیٹ نہ کریں
  if (filteredProducts.length <= 3) {
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
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Solar Panels
            </h2>
            {activeCategory !== "all" && (
              <span className="text-xs bg-sky-100 text-sky-800 font-semibold px-2.5 py-0.5 rounded-full capitalize">
                {activeCategory}
              </span>
            )}
          </div>

          {activeCategory !== "all" && (
            <button
              onClick={() => handleSelectCategory("all")}
              className="text-xs font-semibold text-sky-600 hover:underline cursor-pointer flex items-center gap-1"
            >
              <Layers size={14} /> Show All Panels
            </button>
          )}
        </div>

        {/* 3. Main Section Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          
          {/* Left Large Promo Banner */}
          <div className="lg:col-span-3 bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#075985] rounded-xl p-6 flex flex-col justify-between text-white min-h-[420px] shadow-sm">
            <div>
              <p className="uppercase text-xs tracking-wider font-semibold opacity-90 mb-1 text-sky-200">
                HIGH EFFICIENCY
              </p>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-wide text-amber-300 drop-shadow">
                SOLAR PANELS
              </h3>
              <p className="text-sm mt-3 opacity-90">Tier-1 Guaranteed Quality</p>
            </div>
            
            <div className="relative w-full h-48 mt-4">
              <Image
                src="/promo-solar.png"
                alt="Solar Panels Promo"
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
                Loading solar panels from database...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-sm text-gray-500 font-medium">
                No solar panel products found for this category.
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
                      transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                    }}
                  >
                    {extendedProducts.map((product, idx) => {
                      const orig = parseFloat(product.originalPrice || product.oldPrice) || 0;
                      const disc = parseFloat(product.discountedPrice || product.price) || 0;
                      const savings = orig > disc ? orig - disc : null;

                      return (
                        <div
                          key={`${product.id || product._id || "prod"}-${idx}`}
                          className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-1.5"
                        >
                          {/* Card UI */}
                          <div className="bg-white border border-gray-200 rounded-2xl p-3 flex flex-col justify-between h-full shadow-xs hover:shadow-md transition-shadow relative">
                            
                            <div>
                              {/* Image Box */}
                              <div className="relative w-full h-44 bg-[#f8fafc] rounded-xl overflow-hidden mb-3 flex items-center justify-center">
                                {product.badge && (
                                  <span className="absolute top-2 left-2 z-10 bg-[#008a51] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full tracking-wide">
                                    {product.badge}
                                  </span>
                                )}

                                <Image
                                  src={product.image || product.imageUrl || "/solar1.png"}
                                  alt={product.title || product.name || "Product"}
                                  fill
                                  unoptimized
                                  className="object-contain p-2 hover:scale-105 transition-transform duration-300"
                                />
                              </div>

                              {/* Category Tag */}
                              {(product.categoryPill || product.category || product.tag) && (
                                <div className="mb-1.5">
                                  <span className="inline-block bg-[#f1f5f9] text-[#64748b] text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                                    {product.categoryPill || product.category || product.tag}
                                  </span>
                                </div>
                              )}

                              {/* Title */}
                              <h3 className="text-sm font-bold text-gray-900 line-clamp-1 mb-0.5">
                                {product.title || product.name || "Product Title"}
                              </h3>

                              {/* Description */}
                              {product.description && (
                                <p className="text-[12px] text-gray-500 line-clamp-1 mb-2">
                                  {product.description}
                                </p>
                              )}

                              {/* Specs Badge */}
                              {(product.specifications || product.warranty) && (
                                <div className="mb-3">
                                  <span className="inline-flex items-center gap-1 bg-[#fffbeb] border border-[#fde68a] text-[#b45309] text-[11px] font-medium px-2 py-0.5 rounded-md">
                                    <ShieldCheck size={12} className="text-[#d97706]" />
                                    <span className="truncate">
                                      {product.specifications || product.warranty}
                                    </span>
                                  </span>
                                </div>
                              )}
                            </div>

                            <div>
                              {/* Price */}
                              <div className="flex items-baseline gap-2 mb-0.5">
                                {orig > 0 && (
                                  <span className="text-xs text-gray-400 line-through font-medium">
                                    {orig}
                                  </span>
                                )}
                                <span className="text-base font-extrabold text-gray-900">
                                  {disc || product.price || "N/A"}
                                </span>
                              </div>

                              {/* Save Amount */}
                              {savings && (
                                <p className="text-[11px] font-bold text-[#008a51] mb-3">
                                  Save Rs.{savings}
                                </p>
                              )}

                              {/* Action Button */}
                              <button
                                onClick={() => sendToWhatsApp(product)}
                                className="w-full bg-[#008a51] hover:bg-[#007443] text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                              >
                                <ShoppingBag size={14} />
                                <span>{product.buttonText || "Buy Now"}</span>
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

          {/* Right Sub-Categories */}
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
                        ? "bg-sky-50/80 border-sky-500 shadow-sm"
                        : "bg-white border-gray-100 hover:shadow-xs"
                    }`}
                  >
                    <div>
                      <h4
                        className={`text-sm font-bold transition-colors ${
                          isActive
                            ? "text-[#0284c7]"
                            : "text-gray-900 group-hover:text-sky-600"
                        }`}
                      >
                        {cat.title}
                      </h4>
                      <span className="text-xs text-sky-600 font-medium mt-1 inline-block">
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
              className={`rounded-xl p-4 flex items-center justify-center shadow-xs border cursor-pointer transition-colors ${
                activeCategory === "all"
                  ? "bg-sky-600 text-white border-sky-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-gray-50"
              }`}
            >
              <span className="text-xs font-semibold">
                View all solar panel categories
              </span>
            </div>
          </div>

        </div>

        {/* 4. Bottom Banners */}
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