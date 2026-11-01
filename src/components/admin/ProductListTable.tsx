'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Tag,
  AlertTriangle,
  SlidersHorizontal,
} from 'lucide-react';
import { Product } from '@/data/products';

interface ProductListTableProps {
  products: Product[];
  categories: string[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => Promise<void>;
  onToggleStock: (product: Product) => Promise<void>;
}

export default function ProductListTable({
  products,
  categories,
  onEdit,
  onDelete,
  onToggleStock,
}: ProductListTableProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [stockFilter, setStockFilter] = useState<'All' | 'inStock' | 'outOfStock'>('All');
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Filter products
  const filtered = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesStock =
      stockFilter === 'All' ||
      (stockFilter === 'inStock' && p.inStock) ||
      (stockFilter === 'outOfStock' && !p.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await onDelete(productToDelete.id);
      setProductToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="bg-[#11191C] border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by name, category, or slug..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
          >
            <option value="All" className="bg-[#11191C]">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c} className="bg-[#11191C]">
                {c}
              </option>
            ))}
          </select>

          {/* Stock Filter */}
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as 'All' | 'inStock' | 'outOfStock')}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00E5FF]"
          >
            <option value="All" className="bg-[#11191C]">All Stock</option>
            <option value="inStock" className="bg-[#11191C]">In Stock</option>
            <option value="outOfStock" className="bg-[#11191C]">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Products Count Indicator */}
      <div className="flex items-center justify-between px-1 text-xs text-white/50">
        <span>
          Showing <strong className="text-white">{filtered.length}</strong> of {products.length} products
        </span>
      </div>

      {/* Desktop / Tablet Table View */}
      <div className="hidden sm:block bg-[#11191C] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-[#0D1417]/80 text-[11px] font-bold uppercase tracking-wider text-white/50">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4 text-center">Stock</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs text-white/80">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-white/40">
                    No products found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Product Info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            unoptimized
                            className="object-contain p-1 group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <div className="max-w-xs">
                          <div className="font-bold text-white truncate flex items-center gap-1.5">
                            <span>{product.name}</span>
                            {product.tag && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#00E5FF]/20 text-[#00E5FF] font-black uppercase">
                                {product.tag}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-white/40 font-mono">
                            /product/{product.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-[11px] font-semibold">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4">
                      <div className="font-mono">
                        <span className="font-bold text-[#00E5FF]">
                          GH₵ {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="block text-[11px] text-white/40 line-through">
                            GH₵ {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stock status toggle */}
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleStock(product)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold cursor-pointer transition-all ${
                          product.inStock
                            ? 'bg-[#8EF03A]/15 text-[#8EF03A] hover:bg-[#8EF03A]/25 border border-[#8EF03A]/30'
                            : 'bg-red-500/15 text-red-400 hover:bg-red-500/25 border border-red-500/30'
                        }`}
                        title="Click to toggle availability"
                      >
                        {product.inStock ? (
                          <>
                            <CheckCircle2 className="w-3 h-3" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Featured status */}
                    <td className="py-3 px-4 text-center">
                      {product.isFeatured ? (
                        <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_8px_#00E5FF]" title="Featured in Top Footwear" />
                      ) : (
                        <span className="inline-block w-2 h-2 rounded-full bg-white/20" title="Standard Catalog Item" />
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/product/${product.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                          title="View on store"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => onEdit(product)}
                          className="p-2 rounded-lg bg-[#00E5FF]/10 hover:bg-[#00E5FF]/20 text-[#00E5FF] transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setProductToDelete(product)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-white/40 bg-[#11191C] border border-white/10 rounded-2xl">
            No products match your search.
          </div>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="bg-[#11191C] border border-white/10 rounded-2xl p-4 space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl bg-white/5 border border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain p-1"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white text-sm truncate">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-[#00E5FF]">
                      GH₵ {product.price.toLocaleString()}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-white/60">
                      {product.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => onToggleStock(product)}
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    product.inStock
                      ? 'bg-[#8EF03A]/15 text-[#8EF03A]'
                      : 'bg-red-500/15 text-red-400'
                  }`}
                >
                  {product.inStock ? '● In Stock' : '○ Out of Stock'}
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/product/${product.slug}`}
                    target="_blank"
                    className="p-2 rounded-lg bg-white/5 text-white/70"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onEdit(product)}
                    className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF]"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductToDelete(product)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#11191C] border border-red-500/30 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-white">Delete Product?</h3>
              <p className="text-xs text-white/60">
                Are you sure you want to remove <strong className="text-white">&ldquo;{productToDelete.name}&rdquo;</strong>? This action will remove it from the store catalog.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete Product'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
