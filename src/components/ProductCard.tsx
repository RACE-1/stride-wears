'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Product } from '@/data/mockData';
import { Heart, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, size: string) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes?.[0] || '');
  const [added, setAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedSize);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="group relative flex flex-col bg-white rounded-xl border border-neutral-100 overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-sm">
            No image available
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          type="button"
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
            isLiked
              ? 'bg-red-50 text-red-600'
              : 'bg-white/80 text-neutral-600 hover:text-black hover:bg-white'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            {product.category}
          </span>
          <h3 className="font-bold text-neutral-900 text-base sm:text-lg mt-0.5 group-hover:text-neutral-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Sizes Selector */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-3">
            <span className="text-[11px] font-semibold text-neutral-500 block mb-1">
              Select Size:
            </span>
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 5).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-sm border transition-all ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                  }`}
                >
                  {size}
                </button>
              ))}
              {product.sizes.length > 5 && (
                <span className="text-[10px] text-neutral-400 self-center pl-1">
                  +{product.sizes.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base sm:text-lg font-black text-neutral-900">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm text-neutral-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              {product.inStock ? 'In Stock' : 'Sold Out'}
            </span>
          </div>

          <button
            type="button"
            disabled={!product.inStock}
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-black text-white hover:bg-neutral-800 active:scale-95'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
