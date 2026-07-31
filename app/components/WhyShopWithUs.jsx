"use client";

import React from "react";
import { Star, Truck, ShieldCheck, HelpCircle } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Star,
    title: "QUALITY AND SAVING",
    description: "Comprehensive quality control and affordable prices",
  },
  {
    id: 2,
    icon: Truck,
    title: "FAST SHIPPING",
    description: "24 Hours Order Confirmation and Shipping within 2 to 5 days",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "PAYMENT SECURITY",
    description: "We prioritize the security and reliability of every transaction.",
  },
  {
    id: 4,
    icon: HelpCircle,
    title: "HAVE QUESTIONS?",
    description: "Customer Service - We're here and happy to help!",
  },
];

export default function WhyShopWithUs() {
  return (
    <section className="w-full py-12 px-4 lg:px-8 bg-[#f5f5f5]">
      <div className="mx-auto max-w-[1600px]">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] bg-gray-300 flex-grow max-w-xs sm:max-w-md"></div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center whitespace-nowrap">
            Why Shop With Us?
          </h2>
          <div className="h-[1px] bg-gray-300 flex-grow max-w-xs sm:max-w-md"></div>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white rounded-lg p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[220px] justify-center"
              >
                <div className="mb-4 text-[#ff5722]">
                  <IconComponent size={44} strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-bold tracking-wide text-gray-900 mb-2 uppercase">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed max-w-[240px]">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}