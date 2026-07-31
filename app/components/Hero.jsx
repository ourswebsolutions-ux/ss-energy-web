import React from "react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full bg-gray-50 py-4 px-4 lg:px-8">
      <div className="mx-auto max-w-[1600px]">
        {/* Grid Layout: Left Big Banner + Right 4 Banners */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 items-stretch">
          
          {/* Left Side Big Banner (Takes 7 cols on large screens) */}
          <div className="lg:col-span-7 flex">
            <div className="relative w-full h-full min-h-[220px] sm:min-h-[420px] overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow aspect-[16/9] lg:aspect-auto">
              <Image
                src="/solar.png"
                alt="Main Banner - Primax Solar Inverters"
                fill
                priority
                className="object-contain lg:object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Right Side Grid - 4 Small Banners (Takes 5 cols on large screens) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 lg:gap-4">
            
            {/* Top Left - AC/DC Breakers */}
            <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow aspect-square">
              <Image
                src="/breakers.png"
                alt="AC/DC Breakers"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* Top Right - Lithium Batteries */}
            <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow aspect-square">
              <Image
                src="/batteries.png"
                alt="Lithium Batteries"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* Bottom Left - Smart Home Solutions */}
            <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow aspect-square">
              <Image
                src="/smart.png"
                alt="Smart Home Solutions"
                fill
                className="object-cover rounded-xl"
              />
            </div>

            {/* Bottom Right - Inverex */}
            <div className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow aspect-square">
              <Image
                src="/inverex.png"
                alt="Inverex Solar Inverters"
                fill
                className="object-cover rounded-xl"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}