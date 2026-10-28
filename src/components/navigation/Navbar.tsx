'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Heart, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export const navLinks = [
  { label: 'Men', href: '/#catalog?gender=Men' },
  { label: 'Women', href: '/#catalog?gender=Women' },
  { label: 'Kids', href: '/#catalog?gender=Kids' },
  { label: 'Accessories', href: '/#catalog?category=Accessories' },
  { label: 'Sale', href: '/#catalog?filter=Sale', highlight: true },
];

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount }: NavbarProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems: cartContextTotal, openCart, wishlist, openSearch, openWishlist } = useCart();
  const totalItems = cartCount !== undefined ? cartCount : cartContextTotal;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is active
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
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 pointer-events-auto',
          isScrolled
            ? 'bg-[#11191C]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl py-3.5'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-8 xl:gap-10"
          >
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'group relative text-[15px] font-body font-medium transition-colors duration-200 py-1.5 select-none focus-visible:outline-2 focus-visible:outline-[#00E5FF] rounded-xs',
                  item.highlight
                    ? 'text-[#00E5FF] hover:text-white font-bold'
                    : 'text-white/85 hover:text-white'
                )}
              >
                <span>{item.label}</span>
                {/* Neon accent underline on hover */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300 ease-out group-hover:w-full',
                    item.highlight ? 'bg-[#00E5FF]' : 'bg-[#00E5FF]'
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Right Action Icons: Search, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search store"
              className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#00E5FF] flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00E5FF]"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Wishlist Trigger */}
            <button
              type="button"
              onClick={openWishlist}
              aria-label="View Wishlist"
              className="relative w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-[#00E5FF] flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00E5FF]"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FF7A1A] text-white text-[10px] font-black flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger with Dynamic Counter */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open shopping cart with ${totalItems} items`}
              className="relative w-10 h-10 sm:w-auto sm:px-4 sm:py-2 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/15 hover:bg-[#00E5FF] text-white hover:text-[#0A1014] flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-[0_0_15px_rgba(0,229,255,0.25)] focus-visible:outline-2 focus-visible:outline-[#00E5FF]"
            >
              <ShoppingBag className="w-4 h-4 text-[#00E5FF] group-hover:text-[#0A1014] transition-colors" />
              <span className="hidden sm:inline-block text-xs font-black uppercase tracking-wider text-white group-hover:text-[#0A1014] transition-colors">
                Cart
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:static w-5 h-5 rounded-full bg-[#00E5FF] text-[#0A1014] text-xs font-black flex items-center justify-center shadow-lg animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/80 hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-0 z-50 bg-[#11191C]/98 backdrop-blur-2xl flex flex-col justify-between p-6 lg:hidden"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links List */}
            <nav className="flex flex-col gap-4 my-auto py-6">
              {navLinks.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * idx }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center justify-between text-2xl font-display font-extrabold py-3 border-b border-white/5 transition-colors',
                      item.highlight ? 'text-[#00E5FF]' : 'text-white hover:text-[#00E5FF]'
                    )}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-5 h-5 text-white/30" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSearch();
                }}
                className="w-full py-3.5 rounded-full border border-white/15 bg-white/5 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <Search className="w-4 h-4 text-[#00E5FF]" />
                <span>Search Products</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openCart();
                }}
                className="w-full py-3.5 rounded-full bg-[#00E5FF] text-[#0A1014] text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>View Cart ({totalItems})</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
