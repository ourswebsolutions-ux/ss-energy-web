"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  PlusCircle,
  Trash2,
  Image as ImageIcon,
  Search,
  CheckCircle2,
  ShoppingBag,
  Package,
  Battery,
  Zap,
  Layers,
  AlertCircle,
  Filter,
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    originalPrice: "",
    discountedPrice: "",
    savings: "",
    image: "",
    buttonText: "Add To Cart",
    category: "panels",
    targetSection: "panels",
    warranty: "",
    inStock: true,
    badgeText: "",
    specs: "",
  });

  // ========== FETCH PRODUCTS ==========
  const fetchProducts = async () => {
    try {
      setFetching(true);
      const res = await fetch("/api/products");
      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setProducts(result.data);
      } else if (Array.isArray(result)) {
        setProducts(result);
      } else {
        console.error("Unexpected API response:", result);
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ========== HELPERS ==========
  const calculateSavings = (orig, disc) => {
    const o = parseInt(String(orig).replace(/\D/g, "")) || 0;
    const d = parseInt(String(disc).replace(/\D/g, "")) || 0;

    if (o > d && d > 0) {
      return `Save Rs.${(o - d).toLocaleString()}`;
    }
    return "";
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };

    if (name === "originalPrice" || name === "discountedPrice") {
      updated.savings = calculateSavings(
        name === "originalPrice" ? value : updated.originalPrice,
        name === "discountedPrice" ? value : updated.discountedPrice
      );
    }

    setFormData(updated);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "targetSection") {
        updated.category = value;
      }

      return updated;
    });
  };

  // ========== IMAGE UPLOAD ==========
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("image", file);

    try {
      setNotification("Uploading image...");
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        setNotification("Image uploaded successfully");
        setTimeout(() => setNotification(""), 3000);
      } else {
        alert(data.message || "Image upload failed");
        setNotification("");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed");
      setNotification("");
    }
  };

  // ========== SUBMIT ==========
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.discountedPrice) {
      alert("Please fill required fields (Title & Discount Price)");
      return;
    }

    const sec = (formData.targetSection || "panels").toLowerCase();
    
    // Explicit Payload mapping ensures all card fields stay populated
    const payload = {
      title: formData.title,
      description: formData.description,
      originalPrice: formData.originalPrice,
      discountedPrice: formData.discountedPrice,
      savings: calculateSavings(formData.originalPrice, formData.discountedPrice),
      image: formData.image,
      buttonText: formData.buttonText || "Add To Cart",
      category: sec === "panels" ? "solar" : sec,
      targetSection: sec,
      warranty: formData.warranty,
      inStock: Boolean(formData.inStock),
      badgeText: formData.badgeText,
      specs: formData.specs,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success || data.id || data._id) {
        const newProduct = data.data || data;
        setProducts((prev) => [newProduct, ...prev]);

        setNotification("Product saved successfully!");
        setTimeout(() => setNotification(""), 3000);

        // Reset form
        setFormData({
          title: "",
          description: "",
          originalPrice: "",
          discountedPrice: "",
          savings: "",
          image: "",
          buttonText: "Add To Cart",
          category: "panels",
          targetSection: "panels",
          warranty: "",
          inStock: true,
          badgeText: "",
          specs: "",
        });
      } else {
        alert(data.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Product save error");
    } finally {
      setLoading(false);
    }
  };

  // ========== DELETE ==========
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success || res.ok) {
        setProducts((prev) => prev.filter((p) => (p.id || p._id || p.title) !== id));
        setNotification("Product deleted successfully");
        setTimeout(() => setNotification(""), 3000);
      } else {
        alert(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete product");
    }
  };

  // ========== THEME ==========
  const getCategoryTheme = (section) => {
    const sec = section?.toLowerCase();
    switch (sec) {
      case "panels":
      case "solar":
        return {
          badge: "bg-sky-600 text-white",
          border: "border-bg-sky-600",
          btnBg: "bg-sky-600 hover:bg-sky-600 text-white",
          lightBg: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <Layers size={16} />,
        };
      case "inverters":
      case "inverter":
        return {
          badge: "bg-red-600 text-white",
          border: "border-red-600",
          btnBg: "bg-red-600 hover:bg-red-700 text-white",
          lightBg: "bg-red-50 text-red-700 border-red-200",
          icon: <Zap size={16} />,
        };
      case "batteries":
      case "battery":
        return {
          badge: "bg-emerald-600 text-white",
          border: "border-emerald-600",
          btnBg: "bg-emerald-600 hover:bg-emerald-700 text-white",
          lightBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <Battery size={16} />,
        };
      default:
        return {
          badge: "bg-gray-900 text-white",
          border: "border-gray-900",
          btnBg: "bg-gray-900 hover:bg-black text-white",
          lightBg: "bg-gray-100 text-gray-800 border-gray-300",
          icon: <Package size={16} />,
        };
    }
  };

  const theme = getCategoryTheme(formData.targetSection);

  // ========== FILTER LOGIC ==========
  const filteredProducts = products.filter((p) => {
    const pSection = (p.targetSection || p.category || "").toLowerCase();

    const matchesCategory =
      selectedCategory === "all" ||
      (selectedCategory === "panels" && (pSection === "panels" || pSection === "solar")) ||
      (selectedCategory === "inverters" && (pSection === "inverters" || pSection === "inverter")) ||
      (selectedCategory === "batteries" && (pSection === "batteries" || pSection === "battery"));

    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pSection.includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {notification && (
          <div className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-md font-medium text-sm">
            <CheckCircle2 size={18} /> {notification}
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* ===== FORM ===== */}
          <div className="xl:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <PlusCircle className="text-red-600" size={20} /> Add New Product
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">
                  Target Section / Category *
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "panels", label: "Panels (Solar)", color: "peer-checked:bg-sky-600 peer-checked:border-sky-600" },
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
                      <div
                        className={`py-2.5 px-2 text-center border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all peer-checked:text-white ${sec.color}`}
                      >
                        {sec.label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Product Title *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    name="badgeText"
                    value={formData.badgeText}
                    onChange={handleChange}
                    placeholder="HOT SALE"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter product details..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Specifications</label>
                  <input
                    type="text"
                    name="specs"
                    value={formData.specs}
                    onChange={handleChange}
                    placeholder="585W | Monocrystalline"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Warranty</label>
                  <input
                    type="text"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    placeholder="10 Years Warranty"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Original Price</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Discount Price *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Savings</label>
                  <input
                    type="text"
                    name="savings"
                    value={formData.savings}
                    readOnly
                    placeholder="Auto calculated"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-emerald-700 font-bold text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Button Text</label>
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
                    <span className="text-xs font-bold text-slate-800">In Stock</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product Image</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="Image URL or path"
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 outline-none text-xs font-medium"
                  />
                  <label className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl cursor-pointer text-xs font-bold border border-slate-300 transition-colors">
                    <ImageIcon size={16} /> Choose File
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
              >
                <PlusCircle size={18} />
                {loading ? "Saving..." : "Save & Publish"}
              </button>
            </form>
          </div>

          {/* ===== PREVIEW + LIST ===== */}
          <div className="xl:col-span-7 space-y-6">
            {/* Live Preview */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Card Preview</h2>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${theme.lightBg}`}>
                  {formData.targetSection}
                </span>
              </div>

              <div className="max-w-[280px] mx-auto bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all duration-300 relative flex flex-col justify-between group">
                {formData.badgeText && (
                  <span className={`absolute top-3 left-3 z-10 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs ${theme.badge}`}>
                    {formData.badgeText}
                  </span>
                )}

                <div className="relative w-full aspect-square bg-slate-50 rounded-xl mb-3 overflow-hidden flex items-center justify-center border border-slate-100 group-hover:scale-[1.02] transition-transform">
                  {formData.image ? (
                    <Image src={formData.image} alt="Product" fill unoptimized className="object-contain p-3" />
                  ) : (
                    <div className="text-center text-slate-400 text-xs font-medium">No Image Set</div>
                  )}
                </div>

                {formData.specs && (
                  <div className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md inline-block self-start mb-2">
                    {formData.specs}
                  </div>
                )}

                <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug mb-1">
                  {formData.title || "Product Title Placeholder"}
                </h3>

                {formData.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 mb-2">{formData.description}</p>
                )}

                {formData.warranty && (
                  <div className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block self-start mb-3">
                    🛡️ {formData.warranty}
                  </div>
                )}

                <div className="mt-auto">
                  <div className="flex items-baseline gap-2 mb-1">
                    {formData.originalPrice && (
                      <span className="text-xs text-slate-400 line-through font-medium">{formData.originalPrice}</span>
                    )}
                    <span className="text-sm font-extrabold text-slate-900">{formData.discountedPrice || "Rs.0"}</span>
                  </div>

                  {formData.savings && (
                    <div className="text-[10px] font-bold text-emerald-600 mb-3">{formData.savings}</div>
                  )}

                  <button className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${theme.btnBg}`}>
                    <ShoppingBag size={14} /> {formData.buttonText}
                  </button>
                </div>
              </div>
            </div>

            {/* Published Products Table */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Published Products ({filteredProducts.length})
                </h3>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                  <div className="relative w-full sm:w-36">
                    <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full pl-8 pr-2 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-slate-900 cursor-pointer"
                    >
                      <option value="all">All Categories</option>
                      <option value="panels">Panels (Solar)</option>
                      <option value="inverters">Inverters</option>
                      <option value="batteries">Batteries</option>
                    </select>
                  </div>

                  <div className="relative w-full sm:w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input
                      type="text"
                      placeholder="Search title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>

              {fetching ? (
                <div className="text-center py-12 text-sm text-slate-400">Loading products...</div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto text-slate-300 mb-3" size={32} />
                  <p className="text-sm text-slate-400">No products found</p>
                </div>
              ) : (
           <div className="overflow-x-auto max-h-[280px] overflow-y-auto">
  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500">
                        <th className="pb-3 font-semibold">Product</th>
                        <th className="pb-3 font-semibold">Section</th>
                        <th className="pb-3 font-semibold">Price</th>
                        <th className="pb-3 font-semibold">Stock</th>
                        <th className="pb-3 font-semibold text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filteredProducts.map((p, index) => {
                        const targetSec = p.targetSection || p.category;
                        const pTheme = getCategoryTheme(targetSec);
                        const productId = p.id || p._id || p.title || index;

                        return (
                          <tr key={productId} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3 pr-4">
                              <div className="flex items-center gap-3">
                                <div className="relative w-11 h-11 bg-white rounded-lg border border-slate-200 flex-shrink-0 overflow-hidden">
                                  {p.image ? (
                                    <Image src={p.image} alt={p.title || "Product"} fill unoptimized className="object-contain p-1" />
                                  ) : (
                                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-400">No img</div>
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 truncate max-w-[180px]">{p.title}</div>
                                  <div className="text-[10px] text-slate-500 truncate max-w-[180px]">{p.specs || p.category || "—"}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded ${pTheme.lightBg}`}>
                                {pTheme.icon} {targetSec}
                              </span>
                            </td>
                            <td className="py-3">
                              <div className="font-bold text-slate-900">{p.discountedPrice}</div>
                              {p.originalPrice && <div className="text-[10px] text-slate-400 line-through">{p.originalPrice}</div>}
                            </td>
                            <td className="py-3">
                              {p.inStock ? (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">In Stock</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">Out of Stock</span>
                              )}
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => handleDelete(productId)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={15} />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}