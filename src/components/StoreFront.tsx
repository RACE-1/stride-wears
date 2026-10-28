'use client';

import { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import ProductSection from './ProductSection';
import FeaturesBanner from './FeaturesBanner';
import Footer from './Footer';
import { Product, Category, HeroBannerData } from '@/data/mockData';
import { CheckCircle2, X } from 'lucide-react';

interface StoreFrontProps {
  banner: HeroBannerData;
  categories: Category[];
  products: Product[];
}

export default function StoreFront({
  banner,
  categories,
  products,
}: StoreFrontProps) {
  const [cart, setCart] = useState<{ product: Product; size: string }[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddToCart = (product: Product, size: string) => {
    setCart((prev) => [...prev, { product, size }]);
    setToastMessage(`Added "${product.name}" (${size || 'Standard'}) to your Bag`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar cartCount={cart.length} />

      {/* Floating cart notification toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center space-x-3 border border-neutral-700 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-semibold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="text-neutral-400 hover:text-white pl-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <main className="flex-1">
        <Hero banner={banner} />
        <FeaturesBanner />
        <ProductSection
          initialProducts={products}
          categories={categories}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />
    </div>
  );
}
