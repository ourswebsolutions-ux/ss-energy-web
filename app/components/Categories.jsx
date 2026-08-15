"use client";

import React from "react";
import Image from "next/image";

// Existing product data + subtle energy accents (kept intact)
const categories = [

  {
    id: 2,
    name: "Solar Panels",
    image: "/Solar Panels.jpg",
    glow: "shadow-[0_0_40px_-8px_rgba(251,146,60,0.45)]",
  },
  {
    id: 3,
    name: "Lithium Batteries",
    image: "/lithium.png",
    glow: "shadow-[0_0_40px_-8px_rgba(52,211,153,0.45)]",
  },
  {
    id: 4,
    name: "Hybrid Systems",
    image: "/Hybrid_Systems-removebg-preview.png",
    glow: "shadow-[0_0_40px_-8px_rgba(34,211,238,0.45)]",
  },
  {
    id: 6,
    name: "Solar Batteries",
    image: "/Solar_Batteries-removebg-preview.png",
    glow: "shadow-[0_0_40px_-8px_rgba(16,185,129,0.45)]",
  },
  {
    id: 7,
    name: "Solar Inverters",
    image: "/Solar_Inverters-removebg-preview.png",
    glow: "shadow-[0_0_40px_-8px_rgba(249,115,22,0.45)]",
  },
];

export default function CategoriesSection() {
  return (
    <section className="relative w-full overflow-hidden py-5 sm:py-6 lg:py-8">
      {/* ========== PREMIUM LIGHT BACKGROUND ========== */}
      <div className="absolute inset-0 -z-30 bg-gradient-to-b from-[#f8fafc] via-white to-[#f1f5f9]" />
      <div className="pointer-events-none absolute -top-40 left-[15%] h-[480px] w-[480px] -z-20 rounded-full bg-amber-200/25 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 right-[-5%] h-[420px] w-[420px] -z-20 rounded-full bg-cyan-200/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[5%] h-[360px] w-[360px] -z-20 rounded-full bg-emerald-200/15 blur-[110px]" />

      <div className="relative mx-auto max-w-[1600px] px-4 lg:px-8">
       

      

        {/* ========== MARQUEE STAGE (compact height) ========== */}
        <div className="relative h-[190px] w-full overflow-hidden sm:h-[210px] lg:h-[240px]">
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-40 w-12 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/90 to-transparent sm:w-20 lg:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-40 w-12 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/90 to-transparent sm:w-20 lg:w-28" />

          {/* Soft ambient energy glow (behind everything) */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="ambient-glow absolute left-1/2 top-1/2 h-36 w-[180%] -translate-x-1/2 -translate-y-1/2 opacity-50 blur-3xl" />
          </div>

          {/* ========== RIBBON 1 (orange → golden) – behind products ========== */}
          <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
            <div className="ribbon-track ribbon-1">
              <svg
                className="ribbon-svg"
                viewBox="0 0 2400 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff9a1f" stopOpacity="0.55" />
                    <stop offset="25%" stopColor="#ffb347" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#ff8615" stopOpacity="0.65" />
                    <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff9a1f" stopOpacity="0.5" />
                  </linearGradient>
                  <filter id="ribbonBlur1" x="-20%" y="-40%" width="140%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
                  </filter>
                </defs>
                {/* Wide flowing ribbon path (sine-like) */}
                <path
                  d="M0,200 
                     C150,80 300,80 450,200 
                     C600,320 750,320 900,200 
                     C1050,80 1200,80 1350,200 
                     C1500,320 1650,320 1800,200 
                     C1950,80 2100,80 2250,200 
                     C2325,260 2375,260 2400,200
                     L2400,280
                     C2250,340 2100,340 1950,280
                     C1800,160 1650,160 1500,280
                     C1350,400 1200,400 1050,280
                     C900,160 750,160 600,280
                     C450,400 300,400 150,280
                     C75,220 25,220 0,280 Z"
                  fill="url(#ribbonGrad1)"
                  filter="url(#ribbonBlur1)"
                />
              </svg>
              {/* Duplicate for seamless loop */}
              <svg
                className="ribbon-svg"
                viewBox="0 0 2400 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ribbonGrad1b" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff9a1f" stopOpacity="0.55" />
                    <stop offset="25%" stopColor="#ffb347" stopOpacity="0.7" />
                    <stop offset="50%" stopColor="#ff8615" stopOpacity="0.65" />
                    <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#ff9a1f" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,200 
                     C150,80 300,80 450,200 
                     C600,320 750,320 900,200 
                     C1050,80 1200,80 1350,200 
                     C1500,320 1650,320 1800,200 
                     C1950,80 2100,80 2250,200 
                     C2325,260 2375,260 2400,200
                     L2400,280
                     C2250,340 2100,340 1950,280
                     C1800,160 1650,160 1500,280
                     C1350,400 1200,400 1050,280
                     C900,160 750,160 600,280
                     C450,400 300,400 150,280
                     C75,220 25,220 0,280 Z"
                  fill="url(#ribbonGrad1b)"
                  filter="url(#ribbonBlur1)"
                />
              </svg>
            </div>
          </div>

          {/* ========== PRODUCT MARQUEE ========== */}
          <div className="absolute inset-0 z-20 flex items-center overflow-hidden">
            <div className="product-track flex w-max items-center gap-6 sm:gap-9 lg:gap-12 px-3">
              {[...categories, ...categories].map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="group relative flex w-[110px] flex-shrink-0 flex-col items-center sm:w-[135px] lg:w-[155px]"
                >
                  {/* Soft product glow on hover */}
                  <div
                    className={`absolute -inset-3 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${item.glow}`}
                  />

                  {/* Floating product showcase */}
                  <div className="relative flex h-[95px] w-[95px] items-center justify-center transition-transform duration-500 group-hover:scale-110 sm:h-[110px] sm:w-[110px] lg:h-[125px] lg:w-[125px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={140}
                      height={140}
                      className="object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.12)] transition-all duration-500"
                    />
                  </div>

                  {/* Product label */}
                  <span className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-700 transition-colors duration-300 group-hover:text-[#ff8615] sm:text-[11px] lg:text-xs">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ========== RIBBON 2 (cyan → electric blue → teal) – in front of products ========== */}
          <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
            <div className="ribbon-track ribbon-2">
              <svg
                className="ribbon-svg"
                viewBox="0 0 2400 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ribbonGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
                    <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.55" />
                    <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#2dd4bf" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="ribbonBlur2" x="-20%" y="-40%" width="140%" height="180%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                  </filter>
                </defs>
                <path
                  d="M0,220 
                     C180,100 360,100 540,220 
                     C720,340 900,340 1080,220 
                     C1260,100 1440,100 1620,220 
                     C1800,340 1980,340 2160,220 
                     C2280,160 2340,160 2400,220
                     L2400,300
                     C2280,360 2160,360 2040,300
                     C1860,180 1680,180 1500,300
                     C1320,420 1140,420 960,300
                     C780,180 600,180 420,300
                     C240,420 60,420 0,300 Z"
                  fill="url(#ribbonGrad2)"
                  filter="url(#ribbonBlur2)"
                />
              </svg>
              <svg
                className="ribbon-svg"
                viewBox="0 0 2400 400"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="ribbonGrad2b" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.45" />
                    <stop offset="30%" stopColor="#38bdf8" stopOpacity="0.55" />
                    <stop offset="55%" stopColor="#0ea5e9" stopOpacity="0.5" />
                    <stop offset="80%" stopColor="#2dd4bf" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,220 
                     C180,100 360,100 540,220 
                     C720,340 900,340 1080,220 
                     C1260,100 1440,100 1620,220 
                     C1800,340 1980,340 2160,220 
                     C2280,160 2340,160 2400,220
                     L2400,300
                     C2280,360 2160,360 2040,300
                     C1860,180 1680,180 1500,300
                     C1320,420 1140,420 960,300
                     C780,180 600,180 420,300
                     C240,420 60,420 0,300 Z"
                  fill="url(#ribbonGrad2b)"
                  filter="url(#ribbonBlur2)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* ========== PRODUCT MARQUEE (left ← right) ========== */
        @keyframes product-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .product-track {
          animation: product-marquee 38s linear infinite;
          will-change: transform;
        }

        .product-track:hover {
          animation-play-state: paused;
        }

        /* ========== RIBBON TRACKS ========== */
        .ribbon-track {
          display: flex;
          width: max-content;
          height: 100%;
          will-change: transform;
        }

        .ribbon-svg {
          width: 140vw;
          min-width: 1400px;
          height: 100%;
          flex-shrink: 0;
        }

        /* Ribbon 1 – moves right → left, slightly slower, lower vertical position */
        @keyframes ribbon-flow-1 {
          0% {
            transform: translate3d(0, 8%, 0);
          }
          25% {
            transform: translate3d(-12.5%, -6%, 0);
          }
          50% {
            transform: translate3d(-25%, 10%, 0);
          }
          75% {
            transform: translate3d(-37.5%, -4%, 0);
          }
          100% {
            transform: translate3d(-50%, 8%, 0);
          }
        }

        .ribbon-1 {
          animation: ribbon-flow-1 22s linear infinite;
          opacity: 0.85;
        }

        /* Ribbon 2 – moves left → right (opposite), staggered, higher vertical position */
        @keyframes ribbon-flow-2 {
          0% {
            transform: translate3d(-50%, -10%, 0);
          }
          25% {
            transform: translate3d(-37.5%, 7%, 0);
          }
          50% {
            transform: translate3d(-25%, -12%, 0);
          }
          75% {
            transform: translate3d(-12.5%, 5%, 0);
          }
          100% {
            transform: translate3d(0, -10%, 0);
          }
        }

        .ribbon-2 {
          animation: ribbon-flow-2 26s linear infinite;
          opacity: 0.7;
        }

        /* Ambient soft glow */
        @keyframes ambient-pulse {
          0%,
          100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        .ambient-glow {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 160, 50, 0.35) 20%,
            rgba(56, 189, 248, 0.3) 50%,
            rgba(52, 211, 153, 0.25) 75%,
            transparent 100%
          );
          animation: ambient-pulse 12s ease-in-out infinite;
        }

        /* Mobile refinements */
        @media (max-width: 640px) {
          .ribbon-1 {
            opacity: 0.55;
          }
          .ribbon-2 {
            opacity: 0.45;
          }
          .ribbon-svg {
            width: 220vw;
            min-width: 900px;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .ribbon-svg {
            width: 160vw;
            min-width: 1200px;
          }
        }
      `}</style>
    </section>
  );
}