"use client";

import React, { useState } from "react";
import { X, Send, MessageCircle } from "lucide-react";
import Image from "next/image";

export default function FloatingMailButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Apna WhatsApp Number Yahan Likhain (Country code ke sath, bina + ya 0 ke)
  const phoneNumber = "923214264560"; 
  const defaultMessage = "Assalamu Alaikum! I would like to inquire about your solar energy products and pricing.";

  const toggleWidget = () => setIsOpen((prev) => !prev);

  // Direct WhatsApp Web / App par redirect karne ke liye
  const handleOpenWhatsApp = () => {
    const message = encodeURIComponent(defaultMessage);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end sm:bottom-8 sm:right-8">
      
      {/* TOGGLE WIDGET POPUP */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl bg-white shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300">
          
          {/* Header */}
          <div className="bg-emerald-600 p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                <MessageCircle size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight">SS Energy Helpdesk</h4>
                <p className="text-[11px] text-emerald-100">Official Sales & Support</p>
              </div>
            </div>
            <button 
              onClick={toggleWidget} 
              className="p-1 text-emerald-100 hover:text-white rounded-full hover:bg-emerald-700/50 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Professional Text Body */}
          <div className="p-4 bg-emerald-50/40 text-xs text-gray-700 space-y-2">
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-gray-100 text-gray-800 leading-relaxed">
              <p className="font-bold text-emerald-800 mb-1">
                Assalamu Alaikum! 👋
              </p>
              Welcome to Alladin.pk (SS Energy). How can we assist you with your solar solution today? Click below to connect with our official representative.
            </div>
          </div>

          {/* Action Button */}
          <div className="p-3 bg-white border-t border-gray-100">
            <button
              onClick={handleOpenWhatsApp}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send size={14} /> Connect on WhatsApp
            </button>
          </div>
        </div>
      )}

   {/* MAIN FLOATING BUTTON */}
<button
  onClick={toggleWidget}
  className={`flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all duration-300 cursor-pointer sm:h-14 sm:w-14 lg:h-16 lg:w-16 ${
    isOpen
      ? "bg-gray-800 text-white"
      : "bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-105"
  }`}
>
  {isOpen ? (
    <X size={28} className="text-white" />
  ) : (
    /* Image ki jagah unoptimized Image ya direct Lucide Icon */
    <Image
      src="/whatsapplogo.png" // Ya `/images/whatsapplogo.png`
      alt="WhatsApp"
      width={52}
      height={52}
      unoptimized
      className="object-contain"
    />
  )}
</button>

    </div>
  );
}