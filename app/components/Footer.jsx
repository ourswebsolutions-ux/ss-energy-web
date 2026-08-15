"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
  Shield,
  Home,
  MessageCircle,
} from "lucide-react";

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
    <footer className="w-full bg-[#e5e7eb] from-[#F6F9FF] to-[#EEF4FF] border-t border-[#DCE7F7] text-gray-700">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Brand + Description */}
          <div className="lg:col-span-5">
            {/* Logo */}
                     <div className="flex shrink-0 items-center select-none ">
                       <Image
                         src="/sslogo.png"
                         alt="Alladin.pk Logo"
                         width={180}
                         height={60}
                         priority
                         className="h-16 w-auto sm:h-24 lg:h-[150px]"
                       />
                     </div>

            <p className="text-sm text-gray-600 leading-relaxed max-w-md mb-6">
              Premium solar energy solutions for homes and businesses across Pakistan. 
              Trusted quality, reliable performance, and professional service since day one.
            </p>

            {/* Quick Navigation */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#DCE7F7] text-sm font-medium text-gray-700 hover:border-[#0B4AA8] hover:text-[#0B4AA8] transition-all duration-200 shadow-sm"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>

              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#0B4AA8] to-[#0A2E73] text-sm font-semibold text-white hover:from-[#0A3D8F] hover:to-[#08255C] transition-all duration-200 shadow-md shadow-blue-900/25 hover:shadow-lg hover:shadow-blue-900/30"
              >
                <Shield className="w-4 h-4" />
                Admin Panel
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold text-[#1A1A1A] tracking-[0.15em] uppercase mb-5">
              Contact Information
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3 group">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-[#DCE7F7] flex items-center justify-center flex-shrink-0 group-hover:border-[#0B4AA8]/40 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-[#0B4AA8]" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed pt-1">
                  SS ENERGY Trading Corporation<br />
                  Kasur, Punjab, Pakistan
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3 group">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-[#DCE7F7] flex items-center justify-center flex-shrink-0 group-hover:border-[#0B4AA8]/40 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#0B4AA8]" />
                </div>
                <div className="pt-1">
                  <a
                    href="tel:03351111200"
                    className="block text-sm text-gray-600 hover:text-[#0B4AA8] transition-colors"
                  >
                    +92 321 4264560
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3 group">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-[#DCE7F7] flex items-center justify-center flex-shrink-0 group-hover:border-[#0B4AA8]/40 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5 text-[#0B4AA8]" />
                </div>
                <div className="pt-1">
                  <a
                    href="https://wa.me/923316801200"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-gray-600 hover:text-[#0B4AA8] transition-colors"
                  >
                    WhatsApp: 0331-680-1200
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3 group">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-white border border-[#DCE7F7] flex items-center justify-center flex-shrink-0 group-hover:border-[#0B4AA8]/40 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#0B4AA8]" />
                </div>
                <div className="pt-1">
                  <a
                    href="mailto:contact@ssenergy.pk"
                    className="block text-sm text-gray-600 hover:text-[#0B4AA8] transition-colors"
                  >
                    contact@ssenergy.pk
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold text-[#1A1A1A] tracking-[0.15em] uppercase mb-5">
              Follow Us
            </h3>

            <div className="flex items-center gap-2.5 mb-8">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-white border border-[#DCE7F7] text-[#0B4AA8] flex items-center justify-center hover:bg-[#0B4AA8] hover:text-white hover:border-[#0B4AA8] hover:shadow-md hover:shadow-blue-900/20 transition-all duration-200"
              >
                <Facebook size={17} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white border border-[#DCE7F7] text-[#0B4AA8] flex items-center justify-center hover:bg-[#0B4AA8] hover:text-white hover:border-[#0B4AA8] hover:shadow-md hover:shadow-blue-900/20 transition-all duration-200"
              >
                <Instagram size={17} />
              </a>

              <a
                href="#"
                aria-label="TikTok"
                className="w-10 h-10 rounded-xl bg-white border border-[#DCE7F7] text-[#0B4AA8] flex items-center justify-center hover:bg-[#0B4AA8] hover:text-white hover:border-[#0B4AA8] hover:shadow-md hover:shadow-blue-900/20 transition-all duration-200"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl bg-white border border-[#DCE7F7] text-[#0B4AA8] flex items-center justify-center hover:bg-[#0B4AA8] hover:text-white hover:border-[#0B4AA8] hover:shadow-md hover:shadow-blue-900/20 transition-all duration-200"
              >
                <Youtube size={17} />
              </a>
            </div>

            <div className="rounded-xl bg-white/70 border border-[#DCE7F7] p-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                Authentic solar products with manufacturer-backed quality. Serving customers across Pakistan with care and reliability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#DCE7F7] bg-[#e5e7eb]">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500 text-center sm:text-left">
              © 2020–2026{" "}
              <span className="font-semibold text-[#1A1A1A]">
                SS ENERGY Trading Corporation
              </span>
              . All rights reserved.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Powering a sustainable future</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}