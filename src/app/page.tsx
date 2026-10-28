import React from 'react';
import Hero from '@/components/sections/Hero';
import FeaturedShoes from '@/components/sections/FeaturedShoes';
import OtherProducts from '@/components/sections/OtherProducts';
import Technology from '@/components/sections/Technology';
import Reviews from '@/components/sections/Reviews';
import Cta from '@/components/sections/Cta';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <div
      data-theme="lime"
      className="min-h-screen bg-dark text-ink font-body selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]"
    >
      {/* Keyboard accessible skip-to-content landmark */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-5 focus:py-2.5 focus:bg-[var(--accent)] focus:text-[var(--accent-ink)] focus:font-bold focus:rounded-full focus:shadow-2xl focus:outline-none transition-all"
      >
        Skip to main content
      </a>

      {/* Hero Section: "Born to Run" */}
      <Hero />

      {/* Semantic Main Landmark with Consistent Vertical Flow */}
      <main id="main-content" className="relative z-10 flex flex-col">
        {/* 3. Featured Shoes Grid: 8 Products */}
        <FeaturedShoes />

        {/* 4 & 5. Other Products: Apparel, Bags, Socks, Caps & Bottles + Filters */}
        <OtherProducts />

        {/* Technology Deep-Dive */}
        <Technology />

        {/* Customer Reviews & Testimonials */}
        <Reviews />

        {/* Call to Action Banner */}
        <Cta />
      </main>

      {/* Semantic Footer Landmark with Newsletter & Payment Methods */}
      <Footer />
    </div>
  );
}
