"use client";

import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    id: 1,
    title: "GoodWe Inverter",
    subtitle:
      "High-efficiency hybrid inverters engineered for maximum energy yield and seamless grid integration.",
    buttonText: "Explore Inverters",
    targetId: "inverters",
    image:
      "herose.png",
    alt: "Modern solar inverter system",
  },
  {
    id: 2,
    title: "Solar Energy",
    subtitle:
      "Premium high-performance solar panels delivering reliable clean energy for homes and businesses.",
    buttonText: "Explore Solar Panels",
    targetId: "solar",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
    alt: "Professional solar panel installation",
  },
  {
    id: 3,
    title: "Battery Storage",
    subtitle:
      "Advanced solar battery solutions that store excess energy and power your world day and night.",
    buttonText: "Explore Batteries",
    targetId: "batteries",
    image:
      "/heroses.png",
    alt: "Modern solar battery energy storage system",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const handleButtonClick = () => {
    const target = document.getElementById(slides[current].targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  return (
    <section
      className="relative w-full h-[70vh] min-h-[480px] max-h-[900px] md:h-[80vh] lg:h-[85vh] overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading={index === 0 ? "eager" : "lazy"}
          />
          {/* Consistent dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-2xl lg:max-w-3xl">
            <div key={current} className="animate-fade-in-up">
              <span
                className="inline-block mb-3 sm:mb-4 px-3 py-1 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white rounded-full border"
                style={{
                  backgroundColor: "rgba(11, 64, 132, 0.25)",
                  borderColor: "rgba(11, 64, 132, 0.5)",
                }}
              >
                Solar Energy Solutions
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-5">
                {slides[current].title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-200/90 leading-relaxed mb-6 sm:mb-8 max-w-xl">
                {slides[current].subtitle}
              </p>

              {/* ONLY ONE BUTTON */}
              <button
                onClick={handleButtonClick}
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  backgroundColor: "#0B4084",
                  boxShadow: "0 10px 15px -3px rgba(11, 64, 132, 0.35)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#09356e";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0B4084";
                }}
              >
                {slides[current].buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Previous / Next Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 rounded-full ${
              index === current ? "w-8 h-2.5" : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
            style={
              index === current
                ? { backgroundColor: "#0B4084" }
                : undefined
            }
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          key={current}
          className="h-full origin-left animate-progress"
          style={{
            backgroundColor: "#0B4084",
            animationDuration: "5s",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out forwards;
        }
        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        .animate-progress {
          animation: progress linear forwards;
        }
      `}</style>
    </section>
  );
}