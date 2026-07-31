"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";

// Simple TikTok Icon component for Lucide compatibility
const TikTokIcon = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-3.04-1.22z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full bg-[#f9f9f9] border-t border-gray-100 text-gray-700 text-sm pt-12 pb-8 px-4 lg:px-8">
      <div className="mx-auto max-w-[1600px]">

        {/* Top 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: CONTACT US */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-5 uppercase">
              CONTACT US
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-gray-600">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed">
                  Alladin Store Khara Chungi,<br />
                  Mushtaq Colony, Kasur, Punjab
                </p>
              </div>

              {/* Phone & Whatsapp */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" />
                <div>
                  <p>
                    Phone{" "}
                    <a href="tel:03351111200" className="underline hover:text-black">
                      0335-1111-200
                    </a>
                  </p>
                  <p className="mt-0.5">
                    Whatsapp{" "}
                    <a href="https://wa.me/923316801200" target="_blank" rel="noreferrer" className="underline hover:text-black">
                      03316801200
                    </a>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-900 flex-shrink-0" />
                <a href="mailto:contact@alladin.pk" className="underline hover:text-black">
                  contact@alladin.pk
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-gray-900 tracking-wider mb-3 uppercase">
                SOCIAL LINKS
              </h4>
              <div className="flex items-center gap-2">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Facebook size={16} fill="white" />
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-[#2e6997] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Instagram size={16} />
                </a>

                {/* TikTok */}
                <a
                  href="#"
                  aria-label="TikTok"
                  className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="w-8 h-8 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Youtube size={16} fill="white" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: HOT LINKS */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-5 uppercase">
              HOT LINKS
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-black transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-black transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: FURTHER INFO */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-5 uppercase">
              FURTHER INFO
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/warranty-policy" className="hover:text-black transition-colors">
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-black transition-colors">
                  Return/Replacement Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-black transition-colors">
                  Terms Of Service
                </Link>
              </li>
              <li>
                <Link href="/contact-info" className="hover:text-black transition-colors">
                  Contact Information
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: QUICK LINKS */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider mb-5 uppercase">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-600">
              <li>
                <Link href="/orders" className="hover:text-black transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-black transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-black transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Text */}
        <div className="pt-6 border-t border-gray-200/60 text-xs text-gray-600">
          © 2020–26 <span className="font-bold text-gray-900">Alladin.pk</span> . All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}