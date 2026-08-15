"use client";

import { useState } from "react";
import { Baloo_2 } from "next/font/google";
import Image from "next/image";
import TopBar from "./topbar";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["800"],
});

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <TopBar />

      <header className="relative w-full bg-[#e5e7eb] shadow-md">
        {/* Main Navbar Row */}
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:h-[86px] lg:px-8">
          {/* Logo */}
          <div className="flex shrink-0 items-center select-none md:-ml-14">
            <Image
              src="/sslogo.png"
              alt="Alladin.pk Logo"
              width={180}
              height={60}
              priority
              className="h-16 w-auto sm:h-24 lg:h-[150px]"
            />
          </div>

          {/* UAN - Desktop only */}
          <div className="ml-8 hidden xl:block">
            <p className="whitespace-nowrap text-[15px] font-semibold tracking-wide text-blue-600 transition-colors duration-300 hover:text-blue-700">
              Pak : +92 321 4264560
            </p>
          </div>

          {/* Search - Desktop only */}
          <div className="mx-6 hidden flex-1 justify-center lg:flex">
            <div className="relative w-full max-w-[580px]">
              <input
                type="text"
                placeholder="Search the store"
                className="h-12 w-full rounded-full border border-gray-300 bg-white pl-5 pr-14 text-[15px] text-gray-800 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#0B4084] focus:shadow-md focus:ring-2 focus:ring-[#0B4084]/40"
              />
              <button
                type="button"
                aria-label="Search"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#0B4084] transition-colors duration-300 hover:bg-[#0B4084]/10 hover:text-[#083467]"
              >
                <Search size={22} strokeWidth={2.25} />
              </button>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-5 sm:gap-6 lg:gap-8">
            {/* Sign In - Desktop */}
            <button
              type="button"
              className="hidden flex-col items-center text-[#0B4084] transition-all duration-300 hover:text-[#083467] md:flex"
            >
              <User size={26} strokeWidth={2} />
              <span className="mt-1 text-[13px] font-medium tracking-wide">
                Sign In
              </span>
            </button>

            {/* Cart - Desktop */}
            <button
              type="button"
              className="relative hidden flex-col items-center text-[#0B4084] transition-all duration-300 hover:text-[#083467] md:flex"
            >
              <ShoppingCart size={26} strokeWidth={2} />
              <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0B4084] text-[11px] font-bold text-white shadow-sm">
                0
              </span>
              <span className="mt-1 text-[13px] font-medium tracking-wide">
                Cart
              </span>
            </button>

            {/* Hamburger / Close - Mobile only */}
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="flex items-center justify-center rounded-lg p-2 text-[#0B4084] transition-all duration-300 hover:bg-[#0B4084]/10 active:scale-95 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X size={28} strokeWidth={2.25} />
              ) : (
                <Menu size={28} strokeWidth={2.25} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Slide Down */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${isMobileMenuOpen
              ? "max-h-[320px] opacity-100"
              : "max-h-0 opacity-0"
            }`}
        >
          <div className="mx-4 mb-4 rounded-2xl bg-[#e5e7eb] px-4 py-5 shadow-lg ring-1 ring-gray-300/60">
            {/* Mobile Search */}
            <div className="relative mb-5">
              <input
                type="text"
                placeholder="Search the store"
                className="h-12 w-full rounded-full border border-gray-300 bg-white pl-5 pr-12 text-[15px] text-gray-800 shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-[#0B4084] focus:ring-2 focus:ring-[#0B4084]/40"
              />
              <button
                type="button"
                aria-label="Search"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-[#0B4084] transition-colors duration-300 hover:bg-[#0B4084]/10 hover:text-[#083467]"
              >
                <Search size={22} strokeWidth={2.25} />
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-left text-[#0B4084] transition-all duration-300 hover:bg-[#0B4084]/10 active:bg-[#0B4084]/15"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B4084]/10">
                  <User size={22} strokeWidth={2} />
                </div>
                <span className="text-[15px] font-medium">Sign In</span>
              </button>

              <button
                type="button"
                className="relative flex items-center gap-3 rounded-xl px-3 py-3.5 text-left text-[#0B4084] transition-all duration-300 hover:bg-[#0B4084]/10 active:bg-[#0B4084]/15"
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#0B4084]/10">
                  <ShoppingCart size={22} strokeWidth={2} />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0B4084] text-[11px] font-bold text-white shadow-sm">
                    0
                  </span>
                </div>
                <span className="text-[15px] font-medium">Cart</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}