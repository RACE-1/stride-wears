'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  priorityImage?: boolean;
}

export default function ProductCard({
  product,
  className,
  priorityImage = false,
}: ProductCardProps) {
  const { addToCart, isInWishlist, toggleWishlist, openQuickView, openCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [activeImage, setActiveImage] = useState(product.image);
  const [added, setAdded] = useState(false);
  const isLiked = isInWishlist(product.id);

  const handleColorChange = (e: React.MouseEvent, color: (typeof product.colors)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color);
    if (color.image) {
      setActiveImage(color.image);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      product.sizes[0] || 'Standard',
      selectedColor?.name || product.colors[0]?.name || 'Standard',
      1
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#141E22]/90 border border-white/10 hover:border-[#00E5FF]/40 p-3 sm:p-4 backdrop-blur-md transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,229,255,0.12)]',
        className
      )}
    >
      <div>
        {/* Top visual canvas */}
        <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-[#1E2B30]/60 to-[#0F1619]/90 flex items-center justify-center p-4">
          {/* Subtle accent glow behind image */}
          <div
            className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${
                selectedColor?.hex || '#00E5FF'
              } 0%, transparent 70%)`,
            }}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            {product.tag && (
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#00E5FF] text-black shadow-lg">
                {product.tag}
              </span>
            )}
            {discountPercent && !product.tag && (
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full bg-[#FF7A1A] text-black shadow-lg">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Wishlist toggle button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
            className={cn(
              'absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 border',
              isLiked
                ? 'bg-rose-500/20 border-rose-500/60 text-rose-400'
                : 'bg-black/40 border-white/10 text-white/70 hover:text-white hover:bg-black/60 hover:scale-105'
            )}
          >
            <Heart className={cn('w-4 h-4 transition-transform', isLiked && 'fill-rose-500 scale-110')} />
          </button>

          {/* Clickable image area leading to product page */}
          <Link
            href={`/product/${product.slug}`}
            className="relative w-full h-full flex items-center justify-center cursor-pointer"
          >
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority={priorityImage}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-108"
            />
          </Link>

          {/* Quick View overlay button */}
          <button
            type="button"
            onClick={handleQuickView}
            className="absolute bottom-3 inset-x-3 py-2 px-3 rounded-xl bg-[#11191C]/85 backdrop-blur-md border border-white/15 text-white text-xs font-semibold tracking-wide flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-xl hover:bg-[#00E5FF] hover:text-black hover:border-[#00E5FF]"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>

        {/* Content Area */}
        <div className="pt-3.5 pb-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-white/50 mb-1.5">
            <span className="font-medium tracking-wide uppercase">{product.category} • {product.gender}</span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-white/40 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug}`} className="block group-hover:text-[#00E5FF] transition-colors">
            <h3 className="text-white font-bold text-base sm:text-lg line-clamp-1 leading-snug tracking-tight">
              {product.name}
            </h3>
          </Link>

          {/* Colorway Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={(e) => handleColorChange(e, c)}
                  title={c.name}
                  className={cn(
                    'w-4 h-4 rounded-full border transition-all duration-200',
                    selectedColor?.name === c.name
                      ? 'border-[#00E5FF] scale-125 ring-2 ring-[#00E5FF]/30'
                      : 'border-white/20 hover:scale-110 opacity-70 hover:opacity-100'
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
              <span className="text-[11px] text-white/40 ml-1">
                {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Area: Price & Add to Cart button */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[#00E5FF] font-black text-lg sm:text-xl tracking-tight">
              GH₵ {product.price.toLocaleString()}
            </span>
          </div>
          {product.originalPrice && (
            <span className="text-xs text-white/40 line-through">
              GH₵ {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={cn(
            'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all duration-200 shadow-md cursor-pointer select-none',
            added
              ? 'bg-emerald-500 text-black scale-95'
              : 'bg-white/10 hover:bg-[#00E5FF] text-white hover:text-black border border-white/15 hover:border-[#00E5FF] hover:scale-102 active:scale-95'
          )}
        >
          {added ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
