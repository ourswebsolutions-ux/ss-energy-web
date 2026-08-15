"use client";

import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Layers, ShoppingBag, ShieldCheck } from "lucide-react";
import { sendToWhatsApp } from "../../lib/whatsappUtils";

const rightCategories = [
  { id: 1, key: "hybrid", title: "Hybrid Inverters", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80" },
  { id: 2, key: "off_grid", title: "Off-Grid Inverters", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80" },
  { id: 3, key: "on_grid", title: "On-Grid Inverters", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80" },
];

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
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const updateItemsPerView = () => {
      const w = window.innerWidth;
      if (w >= 1024) setItemsPerView(3);
      else if (w >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

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

  const extendedProducts = useMemo(() => {
    if (filteredProducts.length === 0) return [];
    if (filteredProducts.length <= itemsPerView) return filteredProducts;
    return [...filteredProducts, ...filteredProducts];
  }, [filteredProducts, itemsPerView]);

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

  const handleSelectCategory = (catKey) => {
    setIsTransitioning(false);
    setActiveCategory(catKey);
    setCurrentIndex(0);
    setTimeout(() => {
      setIsTransitioning(true);
    }, 50);
  };

  const slideStep = 100 / itemsPerView;

  return (
    <section className="w-full pt-5 sm:pt-6 pb-8 px-3 sm:px-4 lg:px-8 bg-white overflow-hidden select-none">
      <div className="mx-auto max-w-[1600px]">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-5">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-red-600 mb-1">
              Our Products
            </p>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                Inverters
              </h2>
              {activeCategory !== "all" && (
                <span className="text-[10px] sm:text-xs bg-red-100 text-red-800 font-semibold px-2 sm:px-2.5 py-0.5 rounded-full capitalize">
                  {activeCategory.replace("_", " ")}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm text-gray-500 max-w-xl leading-relaxed">
              Explore high-performance hybrid, off-grid and on-grid inverters for reliable solar energy systems.
            </p>
          </div>

          {activeCategory !== "all" && (
            <button
              onClick={() => handleSelectCategory("all")}
              className="text-xs font-semibold text-red-600 hover:underline cursor-pointer flex items-center gap-1 self-start sm:self-auto shrink-0"
            >
              <Layers size={14} /> Show All Inverters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4 mb-5 sm:mb-6">
          <div className="lg:col-span-12 relative bg-white rounded-xl p-1.5 sm:p-2 md:p-3 shadow-xs border border-gray-100 min-h-[380px] sm:min-h-[420px] flex flex-col justify-center">
            
            {loading ? (
              <div className="text-center py-10 sm:py-12 text-sm text-gray-500 font-medium">
                Loading inverters from database...
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-10 sm:py-12 text-sm text-gray-500 font-medium">
                No inverter products found for this category.
              </div>
            ) : (
              <div className="relative w-full overflow-hidden">
                
                <button
                  onClick={handlePrev}
                  aria-label="Previous"
                  className="absolute left-0.5 sm:left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all cursor-pointer"
                >
                  <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={handleNext}
                  aria-label="Next"
                  className="absolute right-0.5 sm:right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 border border-gray-200 shadow-md flex items-center justify-center text-gray-700 hover:bg-white hover:scale-110 transition-all cursor-pointer"
                >
                  <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                </button>

                {/* Mobile card wider – reduced padding only on mobile */}
                <div className="w-full overflow-hidden px-3 sm:px-9 md:px-10">
                  <div
                    onTransitionEnd={handleTransitionEnd}
                    className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
                    style={{
                      transform: `translateX(-${currentIndex * slideStep}%)`,
                    }}
                  >
                    {extendedProducts.map((product, idx) => {
                      const origNum = parseInt(String(product.originalPrice || "").replace(/\D/g, ""), 10) || 0;
                      const discNum = parseInt(String(product.discountedPrice || "").replace(/\D/g, ""), 10) || 0;
                      const calculatedSavings = origNum > discNum ? `Save Rs.${(origNum - discNum).toLocaleString()}` : null;
                      const savingsText = product.savings || calculatedSavings;

                      return (
                        <div
                          key={`${product.id || product._id || "inverter"}-${idx}`}
                          className="flex-shrink-0 px-1 sm:px-2"
                          style={{ width: `${slideStep}%` }}
                        >
                          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col h-full shadow-xs hover:shadow-md transition-shadow relative group">
                            
                            <div className="relative w-full h-52 sm:h-60 md:h-64 lg:h-72 bg-[#f8fafc] overflow-hidden flex items-center justify-center shrink-0">
                              {product.badgeText && (
                                <span className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[9px] sm:text-[10px] font-black uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full tracking-wide">
                                  {product.badgeText}
                                </span>
                              )}
                              <Image
                                src={product.image || "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80"}
                                alt={product.title || "Inverter"}
                                fill
                                unoptimized
                                className="object-contain p-2 sm:p-3 group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>

                            <div className="p-2.5 sm:p-3 flex flex-col flex-1 justify-between">
                              <div>
                                {(product.category || product.targetSection) && (
                                  <div className="mb-1">
                                    <span className="inline-block bg-[#f1f5f9] text-[#64748b] text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-md">
                                      {product.category || product.targetSection}
                                    </span>
                                  </div>
                                )}
                                <h3 className="text-[13px] sm:text-sm font-bold text-gray-900 line-clamp-1 mb-1 leading-snug">
                                  {product.title || "Product Title"}
                                </h3>
                                {product.description && (
                                  <p className="text-[11px] sm:text-[12px] text-gray-500 line-clamp-2 mb-1.5 leading-relaxed">
                                    {product.description}
                                  </p>
                                )}
                                {(product.specs || product.warranty) && (
                                  <div className="mb-2 flex flex-col gap-1">
                                    {product.specs && (
                                      <span className="inline-flex items-center gap-1 bg-[#fffbeb] border border-[#fde68a] text-[#b45309] text-[10px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-md w-fit max-w-full">
                                        <ShieldCheck size={11} className="text-[#d97706] shrink-0" />
                                        <span className="truncate">{product.specs}</span>
                                      </span>
                                    )}
                                    {product.warranty && (
                                      <span className="inline-flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 text-[10px] sm:text-[11px] font-medium px-1.5 sm:px-2 py-0.5 rounded-md w-fit max-w-full">
                                        🛡️ {product.warranty}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>

                              <div>
                                <div className="flex items-baseline gap-1.5 sm:gap-2 mb-0.5">
                                  {product.originalPrice && (
                                    <span className="text-[11px] sm:text-xs text-gray-400 line-through font-medium">
                                      {product.originalPrice}
                                    </span>
                                  )}
                                  <span className="text-[15px] sm:text-base font-extrabold text-gray-900">
                                    {product.discountedPrice || "N/A"}
                                  </span>
                                </div>
                                {savingsText && (
                                  <p className="text-[10px] sm:text-[11px] font-bold text-red-600 mb-1.5">
                                    {savingsText}
                                  </p>
                                )}
                                {typeof product.inStock === "boolean" && (
                                  <p className={`text-[10px] sm:text-[11px] font-semibold mb-2 ${product.inStock ? "text-emerald-600" : "text-red-600"}`}>
                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                  </p>
                                )}
                                <button
                                  onClick={() => sendToWhatsApp(product)}
                                  className="w-full bg-red-600 hover:bg-red-700 text-white text-[11px] sm:text-xs font-bold py-2 sm:py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                                >
                                  <ShoppingBag size={13} className="sm:w-3.5 sm:h-3.5" />
                                  <span>{product.buttonText || "Add To Cart"}</span>
                                </button>
                              </div>
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
        </div>
      </div>
    </section>
  );
}