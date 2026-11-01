'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useCart();
  const { products } = useProducts();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  if (!isSearchOpen) return null;

  const filtered = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const popularSearches = ['Kinetic Zoom', 'AeroSpeed Carbon', 'Tech Hoodie', 'Duffel', 'Visor Cap', 'Bottles'];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 px-4 sm:px-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeSearch}
          className="fixed inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Search Modal Box */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-[#11191C] border border-white/15 rounded-[28px] overflow-hidden shadow-2xl z-10"
        >
          {/* Search Input Bar */}
          <div className="p-4 sm:p-5 flex items-center gap-3 border-b border-white/10">
            <Search className="w-5 h-5 text-[#00E5FF] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shoes, apparel, bags, gear..."
              className="w-full bg-transparent text-white text-base sm:text-lg placeholder:text-white/40 focus:outline-none font-body"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-white/40 hover:text-white p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={closeSearch}
              className="text-xs uppercase font-bold text-white/60 hover:text-white px-2 py-1 rounded bg-white/5"
            >
              ESC
            </button>
          </div>

          {/* Quick Suggestions (when query is empty) */}
          {!searchQuery && (
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-white/50 block mb-3">
                Trending Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setSearchQuery(term)}
                    className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#00E5FF]/20 hover:text-[#00E5FF] border border-white/10 text-white/80 text-xs font-medium transition-all cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searchQuery && (
            <div className="max-h-[380px] overflow-y-auto p-4 space-y-2">
              {filtered.length === 0 ? (
                <div className="text-center py-10 text-white/50 text-sm">
                  No products found for &ldquo;{searchQuery}&rdquo;. Try another keyword.
                </div>
              ) : (
                filtered.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={closeSearch}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-1 overflow-hidden shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <h4 className="text-white text-sm font-semibold group-hover:text-[#00E5FF] transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs text-white/50">
                          {product.category} • {product.gender}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-display font-bold text-white text-sm">
                        GH₵ {product.price.toLocaleString()}
                      </span>
                      <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                    </div>
                  </Link>
                ))
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
