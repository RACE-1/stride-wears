'use client';

import { useState } from 'react';
import { Product, Category } from '@/data/mockData';
import ProductCard from './ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface ProductSectionProps {
  initialProducts: Product[];
  categories: Category[];
  onAddToCart?: (product: Product, size: string) => void;
}

export default function ProductSection({
  initialProducts,
  categories,
  onAddToCart,
}: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');

  const filtered = initialProducts.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category.toLowerCase() === selectedCategory.toLowerCase();
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // default featured/date
  });

  return (
    <section id="products" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">
            Official Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-900 uppercase">
            Trending Footwear ({sorted.length})
          </h2>
        </div>

        {/* Category Filter Pills & Sort Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                selectedCategory === 'all'
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              All Shoes
            </button>
            {categories
              .filter((c) => c.slug !== 'all')
              .map((cat) => (
                <button
                  key={cat._id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.title)}
                  className={`text-xs font-bold px-4 py-2 rounded-full transition-all ${
                    selectedCategory.toLowerCase() === cat.title.toLowerCase()
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
          </div>

          <div className="flex items-center space-x-2 pl-2 border-l border-neutral-300">
            <SlidersHorizontal className="w-4 h-4 text-neutral-500" />
            <select
              aria-label="Sort products by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs font-bold text-neutral-800 border-none focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {sorted.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sorted.map((prod) => (
            <ProductCard key={prod._id} product={prod} onAddToCart={onAddToCart} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
          <Filter className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-neutral-800">No sneakers found</h3>
          <p className="text-sm text-neutral-500 mt-1">Try switching categories or check back soon.</p>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="mt-4 px-4 py-2 bg-black text-white text-xs font-bold rounded-full"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
