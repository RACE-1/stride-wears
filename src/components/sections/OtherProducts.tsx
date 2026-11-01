'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
  ArrowUpDown,
  Layers,
} from 'lucide-react';
import { otherProducts as fallbackOtherProducts, Product } from '@/data/products';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/products/ProductCard';
import { cn } from '@/lib/utils';

type CategoryFilter = 'All' | 'Apparel' | 'Bags' | 'Socks' | 'Caps' | 'Bottles';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc';

const CATEGORIES: CategoryFilter[] = [
  'All',
  'Apparel',
  'Bags',
  'Socks',
  'Caps',
  'Bottles',
];

const COMMON_COLORS = [
  { name: 'All', hex: '' },
  { name: 'Black', hex: '#11191C' },
  { name: 'Cyan', hex: '#00E5FF' },
  { name: 'Lime', hex: '#8EF03A' },
  { name: 'Orange', hex: '#FF7A1A' },
  { name: 'Grey', hex: '#6B7280' },
];

export default function OtherProducts() {
  const { otherProducts, categories: dynamicCategories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFiltersMobile, setShowFiltersMobile] = useState<boolean>(false);

  const allCategoryTabs = useMemo(() => {
    const list = ['All', 'Apparel', 'Bags', 'Socks', 'Caps', 'Bottles'];
    dynamicCategories.forEach((cat) => {
      if (cat !== 'Shoes' && !list.some((c) => c.toLowerCase() === cat.toLowerCase())) {
        list.push(cat);
      }
    });
    return list;
  }, [dynamicCategories]);

  // Sync URL query params (from Navbar clicks e.g. /#catalog?gender=Men)
  React.useEffect(() => {
    const handleUrlFilters = () => {
      try {
        const url = new URL(window.location.href);
        const genderParam = url.searchParams.get('gender');
        const catParam = url.searchParams.get('category');
        const filterParam = url.searchParams.get('filter');

        if (genderParam && ['Men', 'Women', 'Kids'].includes(genderParam)) {
          setSelectedGender(genderParam);
        }
        if (catParam) {
          if (catParam.toLowerCase() === 'accessories') {
            setSelectedCategory('Bags');
          } else {
            const match = CATEGORIES.find(
              (c) => c.toLowerCase() === catParam.toLowerCase()
            );
            if (match) setSelectedCategory(match);
          }
        }
        if (filterParam === 'Sale') {
          setMaxPrice(1000);
        }
      } catch {
        // Ignore URL parse error
      }
    };

    handleUrlFilters();
    window.addEventListener('hashchange', handleUrlFilters);
    window.addEventListener('popstate', handleUrlFilters);
    return () => {
      window.removeEventListener('hashchange', handleUrlFilters);
      window.removeEventListener('popstate', handleUrlFilters);
    };
  }, []);

  // Extract all available sizes from other products
  const availableSizes = useMemo(() => {
    const sizeSet = new Set<string>();
    otherProducts.forEach((p) => p.sizes.forEach((s) => sizeSet.add(s)));
    return ['All', ...Array.from(sizeSet).slice(0, 8)];
  }, [otherProducts]);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = [...otherProducts];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Gender filter
    if (selectedGender !== 'All') {
      result = result.filter(
        (p) => p.gender === selectedGender || p.gender === 'Unisex'
      );
    }

    // Price filter
    result = result.filter((p) => p.price <= maxPrice);

    // Color filter
    if (selectedColor !== 'All') {
      result = result.filter((p) =>
        p.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        )
      );
    }

    // Size filter
    if (selectedSize !== 'All') {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured default ordering
        break;
    }

    return result;
  }, [
    otherProducts,
    selectedCategory,
    selectedGender,
    maxPrice,
    selectedColor,
    selectedSize,
    sortBy,
  ]);

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedGender !== 'All' ||
    selectedColor !== 'All' ||
    selectedSize !== 'All' ||
    maxPrice < 2000 ||
    sortBy !== 'featured';

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('All');
    setSelectedColor('All');
    setSelectedSize('All');
    setMaxPrice(2000);
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="relative py-20 lg:py-28 bg-[#11191C] overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00E5FF]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Complete Gear Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Apparel & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8EF03A]">Equipment</span>
            </h2>
            <p className="mt-3 text-white/60 text-base sm:text-lg max-w-xl">
              Engineered training apparel, technical trail bags, compression socks, and hydration gear built to withstand relentless effort.
            </p>
          </div>

          {/* Mobile Filter Toggle & Quick Count */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowFiltersMobile((prev) => !prev)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#00E5FF]" />
              <span>{showFiltersMobile ? 'Hide Filters' : 'Filter & Sort'}</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#00E5FF]" />
              )}
            </button>

            <span className="text-xs sm:text-sm font-medium text-white/50 bg-white/5 px-3.5 py-2 rounded-xl border border-white/5">
              Showing <span className="text-white font-bold">{filteredProducts.length}</span> of {otherProducts.length} items
            </span>
          </div>
        </div>

        {/* Category Pills Header Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none no-scrollbar mb-8">
          {allCategoryTabs.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 whitespace-nowrap cursor-pointer select-none',
                  isActive
                    ? 'bg-[#00E5FF] text-black shadow-[0_4px_20px_rgba(0,229,255,0.3)] scale-102'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Filter Controls Row (Expanded on desktop, collapsible on mobile) */}
        <div
          className={cn(
            'p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#141E22]/90 border border-white/10 backdrop-blur-xl mb-10 transition-all duration-300',
            showFiltersMobile ? 'block' : 'hidden lg:block'
          )}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Price Range Filter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-white/70">
                <span>Max Price:</span>
                <span className="text-[#00E5FF] font-bold">GH₵ {maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#00E5FF] bg-white/10 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-white/40 font-mono">
                <span>GH₵ 100</span>
                <span>GH₵ 2,000</span>
              </div>
            </div>

            {/* Gender Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 block">
                Audience
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Men', 'Women', 'Kids'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGender(g)}
                    className={cn(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                      selectedGender === g
                        ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/50'
                        : 'bg-white/5 text-white/60 hover:text-white border border-transparent'
                    )}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 block">
                Color Accent
              </label>
              <div className="flex items-center gap-2">
                {COMMON_COLORS.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    className={cn(
                      'w-6 h-6 rounded-full border transition-all flex items-center justify-center text-[10px] font-bold',
                      selectedColor === c.name
                        ? 'border-[#00E5FF] scale-110 ring-2 ring-[#00E5FF]/40'
                        : 'border-white/20 opacity-70 hover:opacity-100 hover:scale-105'
                    )}
                    style={{
                      backgroundColor: c.hex || 'transparent',
                    }}
                  >
                    {c.name === 'All' && <span className="text-[9px] text-white/80">All</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort by Price & Rating */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-white/70 block">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#00E5FF] appearance-none cursor-pointer"
                >
                  <option value="featured" className="bg-[#11191C] text-white">
                    Featured First
                  </option>
                  <option value="price-asc" className="bg-[#11191C] text-white">
                    Price: Low to High
                  </option>
                  <option value="price-desc" className="bg-[#11191C] text-white">
                    Price: High to Low
                  </option>
                  <option value="rating-desc" className="bg-[#11191C] text-white">
                    Highest Customer Rating
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-white/50 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Reset Filters Bar */}
          {hasActiveFilters && (
            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-white/50">
                Filters active. Matching {filteredProducts.length} items.
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-[#00E5FF] hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset all filters</span>
              </button>
            </div>
          )}
        </div>

        {/* Product Cards Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-3xl bg-[#141E22]/50 border border-white/10 p-8">
            <SlidersHorizontal className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No products match your filters</h3>
            <p className="text-white/50 text-sm max-w-md mx-auto mb-6">
              Try adjusting your price ceiling, removing category constraints, or resetting the filter options.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#00E5FF] text-black font-bold text-sm shadow-lg hover:scale-105 transition-transform"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
