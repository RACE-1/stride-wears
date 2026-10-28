'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Heart,
  ShoppingBag,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Ruler,
  Share2,
  Zap,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Product, ProductColor, allProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/products/ProductCard';
import { cn } from '@/lib/utils';

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const { addToCart, isInWishlist, toggleWishlist, openCart } = useCart();

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Standard', hex: '#00E5FF' });
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState<boolean>(false);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);

  const isLiked = isInWishlist(product.id);

  const handleColorSelect = (color: ProductColor) => {
    setSelectedColor(color);
    if (color.image) {
      setSelectedImage(color.image);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor.name, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="min-h-screen bg-[#0E1518] text-white pt-24 pb-20">
      {/* Subtle ambient lighting */}
      <div
        className="fixed top-20 right-0 w-[500px] h-[500px] rounded-full blur-[160px] opacity-15 pointer-events-none"
        style={{ backgroundColor: selectedColor.hex || '#00E5FF' }}
      />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10 bg-[#8EF03A] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/50 mb-8 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-white/30" />
          <Link href="/#catalog" className="hover:text-white transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3 h-3 text-white/30" />
          <span className="text-[#00E5FF] font-medium truncate">{product.name}</span>
        </nav>

        {/* Main Product Stage: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Display Stage */}
            <div className="relative aspect-square w-full rounded-3xl bg-gradient-to-b from-[#182328] to-[#10171A] border border-white/10 p-8 flex items-center justify-center overflow-hidden group shadow-2xl">
              {/* Radial glow matching chosen color */}
              <div
                className="absolute inset-0 opacity-25 group-hover:opacity-45 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${selectedColor.hex} 0%, transparent 65%)`,
                }}
              />

              {/* Badges */}
              <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                {product.tag && (
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#00E5FF] text-black shadow-lg">
                    {product.tag}
                  </span>
                )}
                {discountPercent && (
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#FF7A1A] text-black shadow-lg">
                    SAVE {discountPercent}%
                  </span>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
                className={cn(
                  'absolute top-5 right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-200 cursor-pointer',
                  isLiked
                    ? 'bg-rose-500/20 border-rose-500/60 text-rose-400'
                    : 'bg-black/40 border-white/10 text-white/70 hover:text-white hover:bg-black/70 hover:scale-105'
                )}
              >
                <Heart className={cn('w-5 h-5 transition-transform', isLiked && 'fill-rose-500 scale-110')} />
              </button>

              {/* Active Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedImage}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-contain p-4 drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)] transition-all duration-500"
                />
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={cn(
                      'relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border p-2 bg-[#141E22] shrink-0 transition-all cursor-pointer',
                      selectedImage === img
                        ? 'border-[#00E5FF] ring-2 ring-[#00E5FF]/40 scale-102'
                        : 'border-white/10 hover:border-white/30 opacity-70 hover:opacity-100'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Specs & Buy Box (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Header info */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center justify-between text-xs text-white/50 uppercase tracking-widest font-bold mb-2">
                <span>STRIDE LABS • {product.gender}</span>
                <span className="text-[#00E5FF]">IN STOCK • ACCRA FAST SHIP</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold">{product.rating}</span>
                </div>
                <span className="text-white/40">•</span>
                <span className="text-white/60">{product.reviewsCount} verified runner reviews</span>
              </div>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#00E5FF] tracking-tight">
                  GH₵ {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-white/40 line-through">
                    GH₵ {product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                <span>Color: <span className="text-white">{selectedColor.name}</span></span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => handleColorSelect(c)}
                    title={c.name}
                    className={cn(
                      'w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center cursor-pointer',
                      selectedColor.name === c.name
                        ? 'border-[#00E5FF] scale-115 ring-4 ring-[#00E5FF]/20'
                        : 'border-white/20 hover:scale-105 opacity-80 hover:opacity-100'
                    )}
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor.name === c.name && (
                      <Check className="w-4 h-4 text-black drop-shadow-md" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                <span>Select Size</span>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(true)}
                  className="inline-flex items-center gap-1 text-[#00E5FF] hover:underline cursor-pointer lowercase first-letter:uppercase"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      'py-3 px-2 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer text-center',
                      selectedSize === s
                        ? 'bg-[#00E5FF] text-black border-[#00E5FF] shadow-[0_4px_16px_rgba(0,229,255,0.3)]'
                        : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30 hover:bg-white/10'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart Buttons */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-white/15 bg-white/5 rounded-2xl p-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl hover:bg-white/10 text-white flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-white text-base">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-xl hover:bg-white/10 text-white flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={cn(
                    'flex-1 py-3.5 px-6 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer',
                    added
                      ? 'bg-emerald-400 text-black scale-98'
                      : 'bg-gradient-to-r from-[#00E5FF] to-[#8EF03A] text-black hover:opacity-95 hover:scale-101 active:scale-98 shadow-[0_6px_25px_rgba(0,229,255,0.35)]'
                  )}
                >
                  {added ? (
                    <>
                      <Check className="w-5 h-5 stroke-[2.5]" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5 stroke-[2.5]" />
                      <span>Add to Bag • GH₵ {(product.price * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* View Cart button if added */}
              {added && (
                <button
                  type="button"
                  onClick={openCart}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-[#00E5FF] text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Open Cart Drawer →
                </button>
              )}
            </div>

            {/* Perks / Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-white/70 mb-8">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span>Express Ghana delivery (1-3 days)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <RotateCcw className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span>30-day wear trial & free returns</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#00E5FF] shrink-0" />
                <span>100% genuine STRIDE engineering</span>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4 text-sm text-white/70 leading-relaxed border-t border-white/10 pt-6">
              <h3 className="text-white font-bold text-base">Product Blueprint</h3>
              <p>{product.description}</p>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-white/50">Technical Specifications</h4>
                  <ul className="space-y-1.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-white/80">
                        <Check className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-28 border-t border-white/10 pt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[#00E5FF] text-xs font-bold uppercase tracking-wider block mb-1">
                  Complete The Outfit
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  You Might Also Like
                </h2>
              </div>
              <Link
                href="/#catalog"
                className="text-xs sm:text-sm font-bold text-[#00E5FF] hover:underline"
              >
                View Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {showSizeGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeGuide(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg rounded-3xl bg-[#141E22] border border-white/15 p-6 sm:p-8 text-white z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-black">STRIDE Sizing Matrix</h3>
                <button
                  type="button"
                  onClick={() => setShowSizeGuide(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-white/60 mb-6">
                All STRIDE footwear fits true-to-size. For competitive marathon racing or track spikes, select your standard performance size.
              </p>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-white/40 uppercase">
                      <th className="py-2.5">US</th>
                      <th className="py-2.5">UK</th>
                      <th className="py-2.5">EU</th>
                      <th className="py-2.5">CM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    <tr><td className="py-2 text-[#00E5FF] font-bold">7.5</td><td className="py-2">6.5</td><td className="py-2">40.5</td><td className="py-2">25.5</td></tr>
                    <tr><td className="py-2 text-[#00E5FF] font-bold">8.0</td><td className="py-2">7.0</td><td className="py-2">41.0</td><td className="py-2">26.0</td></tr>
                    <tr><td className="py-2 text-[#00E5FF] font-bold">8.5</td><td className="py-2">7.5</td><td className="py-2">42.0</td><td className="py-2">26.5</td></tr>
                    <tr><td className="py-2 text-[#00E5FF] font-bold">9.0</td><td className="py-2">8.0</td><td className="py-2">42.5</td><td className="py-2">27.0</td></tr>
                    <tr><td className="py-2 text-[#00E5FF] font-bold">9.5</td><td className="py-2">8.5</td><td className="py-2">43.0</td><td className="py-2">27.5</td></tr>
                    <tr><td className="py-2 text-[#00E5FF] font-bold">10.0</td><td className="py-2">9.0</td><td className="py-2">44.0</td><td className="py-2">28.0</td></tr>
                    <tr><td className="py-2 text-[#00E5FF] font-bold">10.5</td><td className="py-2">9.5</td><td className="py-2">44.5</td><td className="py-2">28.5</td></tr>
                    <tr><td className="py-2 text-[#00E5FF] font-bold">11.0</td><td className="py-2">10.0</td><td className="py-2">45.0</td><td className="py-2">29.0</td></tr>
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="w-full mt-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider"
              >
                Close Guide
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
