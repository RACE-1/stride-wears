'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

export default function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string>('');
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes[0] || '');
      setSelectedColor(quickViewProduct.colors[0]?.name || '');
      setActiveImage(quickViewProduct.image);
      setQuantity(1);
      setAddedAnimation(false);
    }
  }, [quickViewProduct]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedSize, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      closeQuickView();
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={quickViewProduct.name}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[#11191C] border border-white/15 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl z-10 my-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeQuickView}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00E5FF]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: Product Image & Gallery */}
            <div className="relative bg-[#0E1517] p-6 sm:p-8 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-white/10">
              {quickViewProduct.tag && (
                <span className="absolute top-5 left-5 z-10 px-3 py-1 rounded-full bg-[#00E5FF] text-[#0A1014] text-xs font-black tracking-wider uppercase shadow-md">
                  {quickViewProduct.tag}
                </span>
              )}

              {/* Main Image with Underglow */}
              <div className="relative w-full aspect-[4/3] flex items-center justify-center my-auto">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-radial from-[#00E5FF]/25 to-transparent blur-2xl rounded-full pointer-events-none"
                />
                <Image
                  src={activeImage || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  width={600}
                  height={420}
                  className="w-full h-auto object-contain max-h-[280px] drop-shadow-2xl relative z-10 transition-all duration-300 transform hover:scale-105"
                />
              </div>

              {/* Gallery Thumbnails */}
              {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
                <div className="flex items-center gap-2.5 mt-4 z-10">
                  {quickViewProduct.gallery.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={cn(
                        'w-14 h-14 rounded-xl bg-black/40 border p-1 overflow-hidden transition-all cursor-pointer',
                        activeImage === img
                          ? 'border-[#00E5FF] shadow-[0_0_12px_#00E5FF]'
                          : 'border-white/15 hover:border-white/40'
                      )}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        width={60}
                        height={60}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details, Selectors & CTA */}
            <div className="p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Category & Rating */}
                <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                  <span className="uppercase tracking-widest font-semibold text-[#00E5FF]">
                    {quickViewProduct.category} • {quickViewProduct.gender}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#00E5FF] text-[#00E5FF]" />
                    <span className="text-white font-bold">{quickViewProduct.rating}</span>
                    <span>({quickViewProduct.reviewsCount})</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight leading-tight mb-3">
                  {quickViewProduct.name}
                </h2>

                {/* Price in GH₵ */}
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="font-display font-bold text-2xl sm:text-3xl text-white">
                    GH₵ {quickViewProduct.price.toLocaleString()}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-white/40 line-through">
                      GH₵ {quickViewProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-sm text-white/70 line-clamp-3 leading-relaxed mb-6">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
                    Color: <span className="text-white">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2.5">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        aria-label={c.name}
                        onClick={() => {
                          setSelectedColor(c.name);
                          if (c.image) setActiveImage(c.image);
                        }}
                        style={{ backgroundColor: c.hex }}
                        className={cn(
                          'w-7 h-7 rounded-full transition-all cursor-pointer relative',
                          selectedColor === c.name
                            ? 'ring-2 ring-white ring-offset-2 ring-offset-[#11191C] scale-110'
                            : 'opacity-70 hover:opacity-100'
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/70">
                      Select Size
                    </label>
                    <span className="text-xs text-[#00E5FF] hover:underline cursor-pointer">
                      Size Guide
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={cn(
                          'py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer',
                          selectedSize === sz
                            ? 'bg-[#00E5FF] text-[#0A1014] border-[#00E5FF] font-bold shadow-md'
                            : 'bg-white/5 border-white/15 text-white hover:border-white/40'
                        )}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#2BB3FF] text-[#0A1014] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • GH₵ {quickViewProduct.price.toLocaleString()}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-between text-xs text-white/60 px-1">
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#00E5FF]" />
                    <span>Free Ghana Delivery &gt; GH₵ 2,000</span>
                  </div>

                  <Link
                    href={`/product/${quickViewProduct.slug}`}
                    onClick={closeQuickView}
                    className="flex items-center gap-1 text-[#00E5FF] hover:text-white transition-colors font-semibold"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
