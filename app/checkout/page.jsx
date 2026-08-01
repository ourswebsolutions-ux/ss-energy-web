"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Plus, 
  Minus, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  ShoppingBag,
  Lock
} from "lucide-react";

// Updated Product Data with your local image paths from public folder
const initialProduct = {
  id: 1,
  title: "Longi Hi-MO 6 Solar Panel 585W N-Type Mono PERC (Tier-1 High Efficiency)",
  brand: "Longi Solar",
  originalPrice: 23500,
  discountedPrice: 20500,
  savings: 3000,
  rating: 4.9,
  reviewsCount: 128,
  stockStatus: "In Stock",
  images: [
    "/breakers.png", // Main primary image
    "/crimping.png",
    "/camera.png",
    "/meater.png"
  ],
  description:
    "Longi Hi-MO 6 585W Mono PERC N-Type panel offers ultra-high module efficiency up to 22.5%. Engineered with HPBC cell technology for superior anti-LID performance, excellent temperature coefficient, and maximum power generation even in low-light conditions.",
  specs: [
    { label: "Nominal Power", value: "585 Watts" },
    { label: "Cell Type", value: "N-Type Monocrystalline" },
    { label: "Efficiency", value: "Up to 22.5%" },
    { label: "Warranty", value: "12 Years Product, 25 Years Linear Power" },
  ]
};

export default function CheckoutPage() {
  const [product] = useState(initialProduct);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "Faisalabad",
    notes: "",
    paymentMethod: "cod"
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Quantity Handlers
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Calculated Pricing
  const itemTotal = product.discountedPrice * quantity;
  const shippingFee = 1500; // Flat Shipping Rate
  const grandTotal = itemTotal + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address1) {
      alert("Please fill in all required fields!");
      return;
    }
    setOrderPlaced(true);
  };

  return (
    /* MAIN SECTION BACKGROUND: bg-gray-100 */
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-12 select-none text-gray-800">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Breadcrumb Navigation Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 font-medium flex items-center gap-1.5">
              <Link href="/" className="hover:text-orange-600 transition-colors cursor-pointer">
                Home
              </Link>
              <span>/</span>
              <Link href="/" className="hover:text-orange-600 transition-colors cursor-pointer">
                Products
              </Link>
              <span>/</span>
              <span className="text-gray-800 font-semibold">Checkout</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Secure Checkout & Order Review
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-orange-600 bg-white px-3.5 py-2 rounded-full border border-orange-200 shadow-sm">
            <Lock size={14} /> 256-Bit SSL Encrypted
          </div>
        </div>

        {orderPlaced ? (
          /* Order Success View Card */
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 shadow-md text-center max-w-2xl mx-auto my-12">
            <CheckCircle2 size={64} className="text-orange-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Thank you, <span className="font-semibold text-gray-900">{formData.fullName}</span>. Our team will contact you on <span className="font-semibold text-orange-600">{formData.phone}</span> shortly for confirmation.
            </p>
            <div className="bg-orange-50/50 p-4 rounded-xl text-left border border-orange-100 text-xs sm:text-sm mb-6 space-y-2">
              <p><span className="font-bold">Item:</span> {product.title} (x{quantity})</p>
              <p><span className="font-bold">Total Amount:</span> Rs. {grandTotal.toLocaleString()}</p>
              <p><span className="font-bold">Delivery Address:</span> {formData.address1}, {formData.city}</p>
            </div>
            <button
              onClick={() => setOrderPlaced(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-8 py-3 rounded-full transition-colors shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Main 2-Column Checkout Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* LEFT COLUMN: Product Images, Title, Specifications & Details */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Product Main Showcase WHITE Card */}
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-200 shadow-sm flex flex-col gap-6">
                
                {/* Images Preview Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Thumbnails */}
                  <div className="md:col-span-3 flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all bg-gray-50 ${
                          selectedImage === img ? "border-orange-500 shadow-sm scale-95" : "border-gray-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image src={img} alt={`Thumbnail ${idx + 1}`} fill unoptimized className="object-contain p-1" />
                      </button>
                    ))}
                  </div>

                  {/* Main Large Image Display */}
                  <div className="md:col-span-9 relative aspect-square sm:aspect-[4/3] bg-orange-50/20 rounded-xl border border-orange-100/60 flex items-center justify-center order-1 md:order-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors z-10 border border-gray-100"
                    >
                      <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
                    </button>

                    <Image
                      src={selectedImage}
                      alt={product.title}
                      fill
                      unoptimized
                      className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Product Meta Details */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-orange-100 text-orange-800 text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full">
                      {product.brand}
                    </span>
                    <span className="bg-green-100 text-green-800 text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {product.stockStatus}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3">
                    {product.title}
                  </h2>

                  {/* Rating & Reviews */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                      <span className="font-bold text-gray-800 ml-1">{product.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{product.reviewsCount} Customer Reviews</span>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                      Product Overview
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Technical Specifications Table */}
                  <div className="bg-orange-50/30 rounded-xl p-4 border border-orange-100/80">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                      Key Technical Specifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="flex justify-between sm:justify-start gap-2 py-1 border-b border-gray-200/60 last:border-0">
                          <span className="text-gray-500 font-medium">{spec.label}:</span>
                          <span className="font-semibold text-gray-800">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center text-[10px] sm:text-xs text-gray-600">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck size={20} className="text-orange-500" />
                    <span>Official Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck size={20} className="text-orange-500" />
                    <span>Safe Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <RotateCcw size={20} className="text-orange-500" />
                    <span>7 Days Return</span>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Order Quantity, Price Breakdown & User Form */}
            <div className="lg:col-span-5 flex flex-col gap-6">

              {/* Order Pricing & Quantity Selector WHITE Card */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <span>Order Quantity & Price</span>
                  <ShoppingBag size={18} className="text-orange-500" />
                </h3>

                {/* Unit Price Display */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs text-gray-500 font-medium">Unit Price:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-gray-400 line-through">
                      Rs. {product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-base font-extrabold text-orange-600">
                      Rs. {product.discountedPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quantity + / - Controls */}
                <div className="flex items-center justify-between bg-orange-50/40 p-3 rounded-xl border border-orange-100 mb-5">
                  <span className="text-xs font-bold text-gray-700">Select Quantity:</span>
                  <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-lg border border-gray-300 shadow-sm">
                    <button
                      onClick={handleDecrease}
                      className="p-1 rounded hover:bg-gray-100 text-gray-600 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-black text-gray-900 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrease}
                      className="p-1 rounded hover:bg-gray-100 text-gray-600 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({quantity} {quantity > 1 ? "items" : "item"}):</span>
                    <span className="font-semibold text-gray-800">Rs. {itemTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping / Cargo Fee:</span>
                    <span className="font-semibold text-gray-800">Rs. {shippingFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-orange-600 font-medium">
                    <span>Total Discount Savings:</span>
                    <span>- Rs. {(product.savings * quantity).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm sm:text-base font-black text-gray-900 border-t border-gray-200 pt-3 mt-2">
                    <span>Grand Total:</span>
                    <span className="text-orange-600">Rs. {grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* User Delivery Details Form WHITE Card */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                  <span>Customer Delivery Details</span>
                  <MapPin size={18} className="text-orange-500" />
                </h3>

                <form onSubmit={handleSubmitOrder} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        placeholder="e.g. Ali Raza"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone / WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="0300 1234567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        placeholder="ali@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Address Line 1 */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Delivery Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="address1"
                      required
                      placeholder="House No, Street, Colony / Area"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  {/* Address Line 2 (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Address Line 2 <span className="text-gray-400 font-normal">(Optional - Landmark, Floor, etc.)</span>
                    </label>
                    <input
                      type="text"
                      name="address2"
                      placeholder="Near Main Mosque / Famous Landmark"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />
                  </div>

                  {/* City Selection */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-orange-500 bg-white"
                    >
                      <option value="Faisalabad">Faisalabad</option>
                      <option value="Lahore">Lahore</option>
                      <option value="Karachi">Karachi</option>
                      <option value="Islamabad">Islamabad</option>
                      <option value="Rawalpindi">Rawalpindi</option>
                      <option value="Multan">Multan</option>
                    </select>
                  </div>

                  {/* Payment Method Option */}
                  <div className="pt-2">
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label className="flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer hover:bg-gray-50 border-orange-500 bg-orange-50/50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleInputChange}
                          className="accent-orange-500"
                        />
                        <span className="font-semibold text-gray-800">Cash on Delivery</span>
                      </label>
                      <label className="flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer hover:bg-gray-50 border-gray-200">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === "bank"}
                          onChange={handleInputChange}
                          className="accent-orange-500"
                        />
                        <span className="font-semibold text-gray-800">Bank Transfer</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Order Button */}
                  <button
                    type="submit"
                    className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                  >
                    Confirm Order - Rs. {grandTotal.toLocaleString()}
                  </button>

                </form>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}