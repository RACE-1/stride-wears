'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import HeroBackground from '@/components/hero/HeroBackground';
import HeroNav from '@/components/hero/HeroNav';
import HeroCopy from '@/components/hero/HeroCopy';
import HeroShoe from '@/components/hero/HeroShoe';
import StatsBar from '@/components/hero/StatsBar';
import SlideDots from '@/components/hero/SlideDots';
import { slides } from '@/lib/data';
import { useReducedMotion } from 'motion/react';

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handleDotClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // Autoplay every 6s with progress-aware reset, paused on hover and reduced motion
  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered, prefersReducedMotion, activeIndex]);

  // Keyboard navigation: ArrowUp/Down/Left/Right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const currentSlide = slides[activeIndex] || slides[0];

  return (
    <section
      id="hero"
      data-theme={currentSlide.theme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full min-h-screen lg:h-screen lg:min-h-[820px] overflow-hidden bg-dark text-ink select-none flex flex-col justify-between pt-[84px] lg:pt-0 pb-8 lg:pb-0"
    >
      {/* Screen Reader Live Region for Slide Announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Colorway ${activeIndex + 1} of ${totalSlides}: ${currentSlide.name} edition`}
      </div>

      {/* Layer 0: Background with vignette, light beam, radial glow and grain */}
      <HeroBackground />


      {/* Main Content Stage: HeroCopy + HeroShoe (responsive order & alignment) */}
      <div className="relative w-full flex-1 flex flex-col justify-center lg:block max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Layer 20: Left Content & Typography (HeroCopy + Socials) */}
        <HeroCopy />

        {/* Layer 10: 3D Shoe showcase + Ghost text watermark */}
        <HeroShoe currentSlide={currentSlide} priority={activeIndex === 0} />

        {/* Stats Bar (Glass panel at bottom right) */}
        <StatsBar currentSlide={currentSlide} />
      </div>

      {/* Right Edge: Vertical/Horizontal Slide Dots */}
      <SlideDots
        total={totalSlides}
        active={activeIndex}
        onChange={handleDotClick}
      />
    </section>
  );
}
