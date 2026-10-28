'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
import { featuredShoes } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';

export default function FeaturedShoes() {
  return (
    <section id="featured-shoes" className="relative py-20 lg:py-28 bg-[#0D1417] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-[#00E5FF]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 rounded-full bg-[#8EF03A]/10 blur-[120px] pointer-events-none" />

      {/* Ghost background watermark text */}
      <div className="absolute top-8 right-6 select-none pointer-events-none opacity-5 font-black text-8xl md:text-9xl text-white tracking-widest hidden md:block">
        SPEED
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3.5 h-3.5" />
              <span>Engineered For Speed</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#8EF03A]">Footwear</span>
            </h2>
            <p className="mt-3 text-white/60 text-base sm:text-lg leading-relaxed">
              Eight competition-tested silhouettes tuned with kinetic dual-density foam, responsive rebound, and carbon propulsion chassis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white/50 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
              8 Models Available
            </span>
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#00E5FF] hover:text-white transition-colors group"
            >
              <span>Explore All</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* 8-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {featuredShoes.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              priorityImage={idx < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
