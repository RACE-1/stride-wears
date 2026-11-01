'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product, allProducts as initialProducts } from '@/data/products';

interface ProductContextType {
  products: Product[];
  featuredShoes: Product[];
  otherProducts: Product[];
  categories: string[];
  loading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
  addProduct: (product: Partial<Product> & { name: string; price: number; image: string }) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<boolean>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
        }
      }
    } catch (err: unknown) {
      console.warn('Could not fetch live products, keeping current catalog:', err);
      setError((err as Error)?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Derived arrays
  const featuredShoes = useMemo(() => {
    const featured = products.filter((p) => p.category === 'Shoes' && p.isFeatured);
    if (featured.length > 0) return featured;
    return products.filter((p) => p.category === 'Shoes').slice(0, 8);
  }, [products]);

  const otherProducts = useMemo(() => {
    return products.filter((p) => !p.isFeatured || p.category !== 'Shoes');
  }, [products]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [products]);

  const getProductBySlug = useCallback(
    (slug: string) => {
      return products.find((p) => p.slug === slug);
    },
    [products]
  );

  const addProduct = useCallback(
    async (productData: Partial<Product> & { name: string; price: number; image: string }) => {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to add product');
      }

      const created: Product = json.data;
      setProducts((prev) => [created, ...prev]);
      return created;
    },
    []
  );

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to update product');
    }

    const updated: Product = json.data;
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to delete product');
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    return true;
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredShoes,
        otherProducts,
        categories,
        loading,
        error,
        refreshProducts: fetchProducts,
        getProductBySlug,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
