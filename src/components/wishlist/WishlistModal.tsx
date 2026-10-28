'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { allProducts } from '@/data/products';

export default function WishlistModal() {
  const { isWishlistOpen, closeWishlist, wishlist, toggleWishlist, addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWishlistOpen) {
        closeWishlist();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWishlistOpen, closeWishlist]);

  useEffect(() => {
    if (isWishlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWishlistOpen]);

  if (!isWishlistOpen) return null;

  const savedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeWishlist}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl max-h-[85vh] rounded-3xl bg-[#121A1D] border border-white/15 p-6 sm:p-8 flex flex-col z-10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <Heart className="w-5 h-5 fill-rose-500/30" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">Your Saved Gear</h2>
                <p className="text-xs text-white/50">
                  {savedProducts.length} {savedProducts.length === 1 ? 'item' : 'items'} saved to your STRIDE locker
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeWishlist}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of Wishlist items */}
          <div className="flex-1 overflow-y-auto py-5 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-white/30">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No saved items yet</h3>
                <p className="text-xs text-white/50 max-w-xs mx-auto mb-6">
                  Explore our footwear and gear collection, and tap the heart icon on any card to save it for later.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    closeWishlist();
                    const el = document.getElementById('catalog');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#00E5FF] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#00E5FF]/90 transition-all cursor-pointer shadow-lg"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#162227] border border-white/10 hover:border-white/20 transition-all group"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={closeWishlist}
                    className="relative w-20 h-20 rounded-xl bg-gradient-to-b from-[#1F2E35] to-[#121B1E] flex items-center justify-center p-2 shrink-0 overflow-hidden"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-1.5 group-hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-white/50 block">
                      {product.category} • {product.gender}
                    </span>
                    <Link
                      href={`/product/${product.slug}`}
                      onClick={closeWishlist}
                      className="text-sm font-bold text-white hover:text-[#00E5FF] transition-colors truncate block"
                    >
                      {product.name}
                    </Link>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm font-bold text-[#00E5FF]">
                        GH₵ {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-white/40 line-through">
                          GH₵ {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart(product, product.sizes[0], product.colors[0]?.name, 1);
                        toggleWishlist(product.id);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Remove from wishlist"
                      className="w-8 h-8 rounded-xl text-white/40 hover:text-rose-400 hover:bg-rose-400/10 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
