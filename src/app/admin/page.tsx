'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Package,
  Layers,
  Sparkles,
  ExternalLink,
  LogOut,
  RefreshCw,
  CheckCircle2,
  Shield,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/data/products';
import AdminLogin from '@/components/admin/AdminLogin';
import ProductListTable from '@/components/admin/ProductListTable';
import ProductFormModal from '@/components/admin/ProductFormModal';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    products,
    categories,
    loading,
    refreshProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts();

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check');
        const data = await res.json();
        setIsAuthenticated(Boolean(data?.authenticated));
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      setIsAuthenticated(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleSaveProduct = async (formData: Partial<Product>) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, formData);
      showToast(`Product "${formData.name}" successfully updated!`);
    } else {
      await addProduct(formData as Partial<Product> & { name: string; price: number; image: string });
      showToast(`Product "${formData.name}" successfully added to live store!`);
    }
    await refreshProducts();
  };

  const handleDeleteProduct = async (id: string) => {
    const prod = products.find((p) => p.id === id);
    await deleteProduct(id);
    showToast(`Product "${prod?.name || id}" was deleted.`);
    await refreshProducts();
  };

  const handleToggleStock = async (product: Product) => {
    const nextState = !product.inStock;
    await updateProduct(product.id, { inStock: nextState });
    showToast(`"${product.name}" marked as ${nextState ? 'In Stock' : 'Out of Stock'}.`);
    await refreshProducts();
  };

  // Loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#0D1417] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-[#00E5FF] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-white/50 font-bold uppercase tracking-wider">
            Loading Admin Console...
          </span>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => setIsAuthenticated(true)} />;
  }

  // Calculate statistics
  const totalInStock = products.filter((p) => p.inStock).length;
  const totalFeatured = products.filter((p) => p.isFeatured).length;

  return (
    <div className="min-h-screen bg-[#0D1417] text-ink font-body pb-20">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#11191C]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo />
          <div className="h-5 w-px bg-white/10 hidden sm:block" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-[11px] font-black uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Admin Console</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => refreshProducts()}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Refresh database catalog"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden md:inline">Refresh</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Storefront</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Log out from admin"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#00E5FF] text-black px-5 py-3 rounded-2xl shadow-[0_4px_25px_rgba(0,229,255,0.4)] font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dashboard Title & CTA Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Product Catalog & Inventory
            </h1>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Add new products, upload real pictures, adjust prices, and synchronize live with your online store.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.35)] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Product</span>
          </button>
        </div>

        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#11191C] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white">
                {products.length}
              </span>
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                Total Products
              </span>
            </div>
          </div>

          <div className="bg-[#11191C] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8EF03A]/10 text-[#8EF03A] flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white">
                {totalInStock}
              </span>
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                In Stock & Active
              </span>
            </div>
          </div>

          <div className="bg-[#11191C] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white">
                {categories.length}
              </span>
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                Categories
              </span>
            </div>
          </div>

          <div className="bg-[#11191C] border border-white/10 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="block text-xl sm:text-2xl font-black text-white">
                {totalFeatured}
              </span>
              <span className="text-[11px] font-bold text-white/50 uppercase tracking-wider">
                Featured Spotlight
              </span>
            </div>
          </div>
        </div>

        {/* Product Table & Filter Panel */}
        <ProductListTable
          products={products}
          categories={categories}
          onEdit={handleOpenEdit}
          onDelete={handleDeleteProduct}
          onToggleStock={handleToggleStock}
        />
      </main>

      {/* Add / Edit Product Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={categories}
      />
    </div>
  );
}
