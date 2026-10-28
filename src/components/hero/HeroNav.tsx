'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import IconButton from '@/components/ui/IconButton';
import { brand } from '@/lib/brand';

export default function HeroNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <motion.header
      data-component="HeroNav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-0 left-0 right-0 z-30 h-[80px] px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto flex items-center justify-between pointer-events-auto"
    >
      {/* Left: Brand Logo */}
      <div className="flex items-center shrink-0">
        <Logo />
      </div>

      {/* Center: Navigation Links (desktop: 1024px+) */}
      <nav
        aria-label="Primary Navigation"
        className="hidden lg:flex items-center gap-[40px] absolute left-[52%] -translate-x-1/2"
      >
        {brand.navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group relative text-[15px] font-body font-normal text-white hover:text-[var(--accent)] transition-colors duration-300 py-1 focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-sm"
          >
            <span>{item.label}</span>
            {/* 1px underline growing from left on hover */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--accent)] transition-all duration-300 ease-out group-hover:w-full"
            />
          </Link>
        ))}
      </nav>

      {/* Right: Icon Buttons (Search + Filter) */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="hidden sm:flex items-center gap-3">
          <IconButton icon={Search} label="Search shoes" />
          <IconButton icon={SlidersHorizontal} label="Filter specifications" />
        </div>

        {/* Mobile Hamburger toggle (under 1024px) */}
        <div className="lg:hidden">
          <IconButton
            icon={Menu}
            label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
            onClick={() => setMobileMenuOpen(true)}
          />
        </div>
      </div>

      {/* Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#182125]/95 flex flex-col justify-between p-8 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <IconButton
                icon={X}
                label="Close navigation menu"
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>

            <nav className="flex flex-col gap-6 text-center my-auto">
              {brand.navItems.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-display font-bold text-white hover:text-[var(--accent)] transition-colors inline-block py-2 focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-center gap-4 pt-6 border-t border-[var(--glass-border)]">
              <IconButton icon={Search} label="Search shoes" />
              <IconButton icon={SlidersHorizontal} label="Filter specifications" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
