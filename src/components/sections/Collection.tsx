'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import GlassPanel from '@/components/ui/GlassPanel';
import AccentButton from '@/components/ui/AccentButton';
import { collectionProducts, CollectionProduct } from '@/lib/data';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Running', 'Training', 'Lifestyle'];

  const filteredProducts =
    activeCategory === 'All'
      ? collectionProducts
      : collectionProducts.filter((p) => p.category === activeCategory);

  const handleKeyDownTabs = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      const nextIdx = (index + 1) % categories.length;
      setActiveCategory(categories[nextIdx]);
    } else if (e.key === 'ArrowLeft') {
      const prevIdx = (index - 1 + categories.length) % categories.length;
      setActiveCategory(categories[prevIdx]);
    }
  };

  return (
    <section
      id="collection"
      data-theme="lime"
      className="relative z-20 py-20 sm:py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Header Row: Eyebrow + Title (left) & Pill Filter Tabs (right) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-12 border-b border-[var(--glass-border)]">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent)] block mb-2">
            LATEST DROPS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-[clamp(36px,5vw,60px)] font-bold tracking-tight text-white uppercase leading-none">
            Pick your pace.
          </h2>
        </div>

        {/* Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter shoes by category"
          className="flex flex-wrap items-center gap-2 sm:gap-2.5"
        >
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                tabIndex={isActive ? 0 : -1}
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                onKeyDown={(e) => handleKeyDownTabs(e, idx)}
                className={cn(
                  'px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-body cursor-pointer transition-all duration-300 select-none focus-visible:outline-2 focus-visible:outline-[var(--accent)]',
                  isActive
                    ? 'bg-[var(--accent)] text-[var(--accent-ink)] font-bold shadow-md scale-105'
                    : 'border border-white/20 text-white/90 hover:border-white/50 hover:bg-white/5 font-medium'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6-Card Grid with layout animations */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Centered "View all shoes" Button Under the Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-14 sm:mt-16 flex justify-center"
      >
        <AccentButton variant="outline" className="px-9 py-4 text-base">
          View all shoes
        </AccentButton>
      </motion.div>
    </section>
  );
}

interface ProductCardProps {
  product: CollectionProduct;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const [selectedColorwayIdx, setSelectedColorwayIdx] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const colorway =
    product.colorways[selectedColorwayIdx] || product.colorways[0];

  const imageSrc =
    colorway.image || `/images/shoe-${colorway.theme}.png`;

  return (
    <motion.div
      layout
      data-theme={colorway.theme}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <GlassPanel className="p-5 rounded-[28px] border border-[var(--glass-border)] group-hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)] group-hover:shadow-[0_0_35px_rgb(var(--accent-rgb)/0.2)] transition-all duration-500 flex flex-col justify-between h-full bg-[var(--surface)]/50 backdrop-blur-xl">
        {/* Tall Image Area (Aspect 5/4) */}
        <div className="relative aspect-[5/4] w-full rounded-[20px] overflow-hidden bg-black/25 flex items-center justify-center select-none">
          {/* Top-Left Tag Pill */}
          {product.tag && (
            <span className="absolute top-3.5 left-3.5 z-20 bg-[var(--accent)] text-[var(--accent-ink)] text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-xs tracking-wider">
              {product.tag}
            </span>
          )}

          {/* Top-Right Heart Wishlist Button */}
          <button
            type="button"
            aria-label={`Save ${product.name} to wishlist`}
            aria-pressed={isLiked}
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#182125]/70 border border-white/10 backdrop-blur-md flex items-center justify-center text-white hover:text-[var(--accent)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          >
            <Heart
              className={cn(
                'w-4 h-4 transition-colors',
                isLiked
                  ? 'fill-[var(--accent)] text-[var(--accent)]'
                  : 'text-white'
              )}
            />
          </button>

          {/* Ghost Text Watermark Behind Shoe */}
          <span
            aria-hidden="true"
            className="ghost-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-body font-black text-[18vw] sm:text-[10vw] lg:text-[7.5vw] tracking-[0.15em] uppercase select-none pointer-events-none z-0 opacity-60 whitespace-nowrap"
          >
            {product.watermark}
          </span>

          {/* Underglow Blurred Ellipse */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[70%] h-[24%] pointer-events-none rounded-[50%] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                'radial-gradient(ellipse at center, rgb(var(--accent-rgb) / 0.35) 0%, transparent 70%)',
              filter: 'blur(30px)',
            }}
          />

          {/* Animated Shoe Floating & Hover Zoom */}
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [-3, 3, -3],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 w-[78%] h-auto flex items-center justify-center transform -rotate-12 group-hover:-rotate-4 group-hover:scale-108 transition-transform duration-500 ease-out"
          >
            <Image
              src={imageSrc}
              alt={product.name}
              width={500}
              height={360}
              loading="lazy"
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 380px"
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* Product Details Section Under Image */}
        <div className="mt-4 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs uppercase font-body font-medium tracking-wider text-muted">
                {product.category}
              </span>

              {/* Star Rating */}
              <div className="flex items-center gap-1 text-xs text-white/90">
                <Star className="w-3.5 h-3.5 fill-[var(--accent)] text-[var(--accent)]" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-muted text-[11px]">({product.reviewsCount})</span>
              </div>
            </div>

            <h3 className="font-body font-medium text-white text-[19px] sm:text-[20px] tracking-tight mt-1 group-hover:text-[var(--accent)] transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
          </div>

          {/* Swatches & Price */}
          <div className="mt-4 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
            {/* 3 Colorway Swatch Dots */}
            <div className="flex items-center gap-2">
              {product.colorways.map((cw, idx) => (
                <button
                  key={cw.theme}
                  type="button"
                  aria-label={`Select ${cw.name} colorway for ${product.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColorwayIdx(idx);
                  }}
                  className={cn(
                    'w-4 h-4 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]',
                    cw.theme === 'lime' && 'bg-[#8EF03A]',
                    cw.theme === 'orange' && 'bg-[#FF7A1A]',
                    cw.theme === 'blue' && 'bg-[#2BB3FF]',
                    selectedColorwayIdx === idx
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-[#182125] scale-110'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  )}
                />
              ))}
            </div>

            {/* Price with struck-through old price */}
            <div className="flex items-baseline gap-2">
              <span className="font-display font-bold text-white text-xl">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-muted line-through">
                  ${product.oldPrice}
                </span>
              )}
            </div>
          </div>

          {/* "Add to cart" Accent Pill Button */}
          <div className="mt-3.5">
            <button
              type="button"
              aria-label={`Add ${product.name} to cart`}
              className={cn(
                'w-full py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]',
                'bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-110 active:scale-95 shadow-sm',
                'opacity-100 lg:opacity-0 lg:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
              )}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </GlassPanel>
    </motion.div>
  );
}
