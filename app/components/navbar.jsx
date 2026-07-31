"use client";

import { Baloo_2 } from "next/font/google";
import TopBar from "./topbar";
import {
  Search,
  User,
  ShoppingCart,
  Menu,
} from "lucide-react";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["800"],
});

export default function Navbar() {
  return (
    <>
      <TopBar />

      <header className="w-full bg-[#ff8615]">
        <div className="mx-auto flex h-[86px] max-w-[1600px] items-center px-4 lg:px-8">

          {/* Logo */}
          <div className="flex flex-col leading-none select-none">
            <h1
              className={`${baloo.className} text-[42px] font-extrabold tracking-[-1px] text-white`}
            >
              Alladin
              <span className=" text-[18px] font-bold">.pk</span>
            </h1>

            <p className="ml-1 mt-[2px] text-[12px] font-medium tracking-[0.15em] text-white">
              buy all a din
            </p>
          </div>

          {/* UAN */}
          <div className="ml-16 hidden xl:block">
            <p className="text-[16px] font-bold text-white whitespace-nowrap">
              UAN : 0335-1111-200
            </p>
          </div>

          {/* Search */}
          <div className="hidden flex-1 justify-center px-8 lg:flex">
            <div className="relative w-full max-w-[600px]">

              <input
                type="text"
                placeholder="Search the store"
                className="h-12 w-full rounded-full bg-white pl-6 pr-14 text-[16px] text-gray-700 shadow-lg outline-none"
              />

              <button
                type="button"
                className="absolute right-5 top-1/2 -translate-y-1/2"
              >
                <Search
                  size={28}
                  strokeWidth={2}
                  className="text-[#ff6d00]"
                />
              </button>

            </div>
          </div>

          {/* Right Side */}
          <div className="ml-auto flex items-center gap-8">

            <button className="hidden md:flex flex-col items-center text-white">
              <User size={30} strokeWidth={2} />

              <span className="mt-1 text-[14px]">
                Sign In
              </span>
            </button>

            <button className="relative hidden md:flex flex-col items-center text-white">

              <ShoppingCart size={30} strokeWidth={2} />

              <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-[#ff8615]">
                0
              </span>

              <span className="mt-1 text-[14px]">
                Cart
              </span>

            </button>

            <button className="text-white lg:hidden">
              <Menu size={30} />
            </button>

          </div>
        </div>

        {/* Mobile Search */}
        <div className="bg-[#ff8615] px-4 pb-4 lg:hidden">

          <div className="relative">

            <input
              type="text"
              placeholder="Search the store"
              className="h-11 w-full rounded-full bg-white pl-5 pr-12 text-[15px] outline-none"
            />

            <Search
              size={24}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#ff6d00]"
            />

          </div>

        </div>
      </header>
    </>
  );
}