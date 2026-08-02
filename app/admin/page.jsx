"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PlusCircle, Trash2, Image as ImageIcon, Search, CheckCircle2, ShoppingBag } from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    savings: "",
    image: "",
    buttonText: "Add To Cart",
    category: "",
    targetSection: "panels",
    warranty: "",
    inStock: true,
    badgeText: "",
    specs: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("solar_store_products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      const defaultProducts = [
        {
          id: 1,
          title: "Longi Hi-MO 6 N-Type 585W Mono Perc Solar Panel",
          description: "High efficiency solar panel with low degradation rate.",
          originalPrice: "Rs.35,000",
          discountedPrice: "Rs.28,500",
          savings: "Save Rs.6,500",
          image: "/panel1.png",
          buttonText: "Add To Cart",
          category: "550w-mono",
          targetSection: "panels",
          warranty: "12 Years",
          inStock: true,
          badgeText: "HOT DEAL",
          specs: "585W | Monocrystalline",
        },
        {
          id: 2,
          title: "GoodWe ES Uniq GW8000M-ES-C10 8kw Hybrid Solar Inverter",
          description: "Dual MPPT hybrid inverter with battery backup option.",
          originalPrice: "Rs.340,000",
          discountedPrice: "Rs.310,000",
          savings: "Save Rs.30,000",
          image: "/inverter1.png",
          buttonText: "Pre-Order",
          category: "2.5-10kw",
          targetSection: "inverters",
          warranty: "5 Years",
          inStock: true,
          badgeText: "POPULAR",
          specs: "8kW | Hybrid",
        },
      ];
      setProducts(defaultProducts);
      localStorage.setItem("solar_store_products", JSON.stringify(defaultProducts));
    }
  }, []);

  const syncProducts = (updatedList) => {
    setProducts(updatedList);
    localStorage.setItem("solar_store_products", JSON.stringify(updatedList));
    window.dispatchEvent(new Event("storage"));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    if (name === "originalPrice" || name === "discountedPrice") {
      const orig = parseInt(updatedForm.originalPrice.replace(/\D/g, "")) || 0;
      const disc = parseInt(updatedForm.discountedPrice.replace(/\D/g, "")) || 0;

      if (orig > disc && disc > 0) {
        const diff = orig - disc;
        updatedForm.savings = `Save Rs.${diff.toLocaleString()}`;
      }
    }

    setFormData(updatedForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.discountedPrice) {
      alert("Please fill title and discounted price.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      ...formData,
      image: formData.image || "/placeholder.png",
    };

    const updated = [newProduct, ...products];
    syncProducts(updated);

    setNotification("Product added to website successfully!");
    setTimeout(() => setNotification(""), 3000);

    setFormData({
      title: "",
      description: "",
      originalPrice: "",
      discountedPrice: "",
      savings: "",
      image: "",
      buttonText: "Add To Cart",
      category: "",
      targetSection: formData.targetSection,
      warranty: "",
      inStock: true,
      badgeText: "",
      specs: "",
    });
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const filtered = products.filter((p) => p.id !== id);
      syncProducts(filtered);
    }
  };

  // Section Color Themes
  const getCategoryTheme = () => {
    switch (formData.targetSection) {
      case "panels":
        return {
          badge: "bg-amber-500 text-white",
          border: "border-amber-500",
          btnBg: "bg-amber-500 hover:bg-amber-600 text-white",
          lightBg: "bg-amber-50 text-amber-700 border-amber-200",
        };
      case "inverters":
        return {
          badge: "bg-red-600 text-white",
          border: "border-red-600",
          btnBg: "bg-red-600 hover:bg-red-700 text-white",
          lightBg: "bg-red-50 text-red-700 border-red-200",
        };
      case "batteries":
        return {
          badge: "bg-emerald-600 text-white",
          border: "border-emerald-600",
          btnBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
          lightBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      default:
        return {
          badge: "bg-gray-900 text-white",
          border: "border-gray-900",
          btnBg: "bg-gray-900 hover:bg-black text-white",
          lightBg: "bg-gray-100 text-gray-800 border-gray-300",
        };
    }
  };

  const theme = getCategoryTheme();

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.targetSection.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Notification Toast */}
        {notification && (
          <div className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-md font-medium text-sm">
            <CheckCircle2 size={18} /> {notification}
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="text-red-600" size={20} /> Add New Product
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  Select Component Target *
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "panels", label: "Solar Panels", color: "peer-checked:bg-amber-500 peer-checked:border-amber-500" },
                    { id: "inverters", label: "Inverters", color: "peer-checked:bg-red-600 peer-checked:border-red-600" },
                    { id: "batteries", label: "Batteries", color: "peer-checked:bg-emerald-600 peer-checked:border-emerald-600" },
                  ].map((sec) => (
                    <label key={sec.id} className="cursor-pointer">
                      <input
                        type="radio"
                        name="targetSection"
                        value={sec.id}
                        checked={formData.targetSection === sec.id}
                        onChange={handleChange}
                        className="peer sr-only"
                      />
                      <div className={`py-2.5 px-3 text-center border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all peer-checked:text-white ${sec.color}`}>
                        {sec.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Title & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Longi Hi-MO 6 N-Type 585W"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Badge Tag
                  </label>
                  <input
                    type="text"
                    name="badgeText"
                    value={formData.badgeText}
                    onChange={handleChange}
                    placeholder="e.g. HOT SALE"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-xs font-medium"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product Description
                </label>
                <textarea
                  name="description"
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-xs font-medium resize-none"
                />
              </div>

              {/* Specs & Warranty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Specifications
                  </label>
                  <input
                    type="text"
                    name="specs"
                    value={formData.specs}
                    onChange={handleChange}
                    placeholder="e.g. 585W | Monocrystalline"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Warranty
                  </label>
                  <input
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    placeholder="e.g. 10 Years Warranty"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                </div>
              </div>

              {/* Prices */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Original Price
                  </label>
                  <input
                    type="text"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handlePriceChange}
                    placeholder="Rs.35,000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Discount Price *
                  </label>
                  <input
                    type="text"
                    name="discountedPrice"
                    value={formData.discountedPrice}
                    onChange={handlePriceChange}
                    placeholder="Rs.28,500"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Savings Amount
                  </label>
                  <input
                    type="text"
                    name="savings"
                    value={formData.savings}
                    onChange={handleChange}
                    placeholder="Save Rs.6,500"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-emerald-700 font-bold text-xs outline-none"
                  />
                </div>
              </div>

              {/* Category, Button & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category Key
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. 550w-mono"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Button Text
                  </label>
                  <select
                    name="buttonText"
                    value={formData.buttonText}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium bg-white"
                  >
                    <option value="Add To Cart">Add To Cart</option>
                    <option value="Pre-Order">Pre-Order</option>
                    <option value="Buy Now">Buy Now</option>
                  </select>
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-slate-900 focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      In Stock
                    </span>
                  </label>
                </div>
              </div>

              {/* Image Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product Image
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image Path or Link (e.g. /panel1.png)"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                  <label className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl cursor-pointer text-xs font-bold border border-slate-300 transition-colors">
                    <ImageIcon size={16} /> Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <PlusCircle size={18} /> Save & Publish
              </button>

            </form>
          </div>

          {/* Right Side - Exact Component Card Preview & List */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Component Exact Card Preview */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Exact Frontend Card
                </h2>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${theme.lightBg}`}>
                  {formData.targetSection}
                </span>
              </div>

              {/* Exact E-Commerce Card Structure */}
              <div className="max-w-[280px] mx-auto bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between group">
                
                {/* Top Badge Tag */}
                {formData.badgeText && (
                  <span className={`absolute top-3 left-3 z-10 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs ${theme.badge}`}>
                    {formData.badgeText}
                  </span>
                )}

                {/* Card Image Container */}
                <div className="relative w-full aspect-square bg-slate-50 rounded-xl mb-3 overflow-hidden flex items-center justify-center border border-slate-100 group-hover:scale-[1.02] transition-transform">
                  {formData.image ? (
                    <Image
                      src={formData.image}
                      alt="Product"
                      fill
                      unoptimized
                      className="object-contain p-3"
                    />
                  ) : (
                    <div className="text-center text-slate-400 text-xs font-medium">
                      No Image Set
                    </div>
                  )}
                </div>

                {/* Specs Tag */}
                {formData.specs && (
                  <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md inline-block self-start mb-2">
                    {formData.specs}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug mb-1">
                  {formData.title || "Product Title Placeholder"}
                </h3>

                {/* Description */}
                {formData.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-3">
                    {formData.description}
                  </p>
                )}

                {/* Price Section */}
                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-1">
                    {formData.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-medium">
                        {formData.originalPrice}
                      </span>
                    )}
                    <span className="text-sm font-extrabold text-slate-900">
                      {formData.discountedPrice || "Rs.0"}
                    </span>
                  </div>

                  {formData.savings && (
                    <div className="text-[10px] font-bold text-emerald-600 mb-3">
                      {formData.savings}
                    </div>
                  )}

                  {/* Component Button */}
                  <button className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${theme.btnBg}`}>
                    <ShoppingBag size={14} /> {formData.buttonText}
                  </button>
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase">
                  Published Items ({filteredProducts.length})
                </h3>

                <div className="relative w-36">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-7 pr-2 py-1 text-xs rounded-lg border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-6 text-xs text-slate-400">
                    No products found
                  </div>
                ) : (
                  filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="relative w-10 h-10 bg-white rounded-lg border border-slate-200 flex-shrink-0">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            unoptimized
                            className="object-contain p-1"
                          />
                        </div>
                        <div className="truncate">
                          <h4 className="text-xs font-bold text-slate-900 truncate">
                            {p.title}
                          </h4>
                          <div className="text-[10px] text-slate-500">
                            <span className="font-bold text-emerald-600">{p.discountedPrice}</span> • <span className="uppercase font-bold text-slate-700">{p.targetSection}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors ml-1 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}