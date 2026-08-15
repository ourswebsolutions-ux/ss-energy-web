"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const slides = [
  {
    image: "/hero1.jpg",
    alt: "Solar Energy Solutions",
  },
  {
    image: "/hero2.jpg",
    alt: "AC/DC Breakers",
  },
  {
    image: "/hero3.jpg",
    alt: "Lithium Batteries",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Autoplay with proper cleanup
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, currentSlide]);

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section className="w-full">
      {/* 
        Responsive fixed heights for a taller, more premium hero.
        object-contain + matching dark background ensures the full
        1920×600 artwork stays visible without horizontal cropping
        or distortion on every breakpoint.
      */}
      <div
        className="relative w-full h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px] xl:h-[550px] 2xl:h-[600px] overflow-hidden bg-[#0a1628]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentSlide
                ? "z-10 opacity-100"
                : "z-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-contain object-center"
                sizes="100vw"
              />
            </div>
          </div>
        ))}

        {/* Controls - bottom center of the visible banner */}
        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-5 sm:gap-3">
          {/* Previous */}
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 sm:h-9 sm:w-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:h-[18px] sm:w-[18px]"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5 px-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 sm:h-2.5 sm:w-2.5 ${
                  index === currentSlide
                    ? "scale-125 bg-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 sm:h-9 sm:w-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:h-[18px] sm:w-[18px]"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          {/* Pause / Play */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            className="ml-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 sm:ml-1 sm:h-9 sm:w-9"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                className="sm:h-4 sm:w-4"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="10"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
                className="sm:h-4 sm:w-4"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}