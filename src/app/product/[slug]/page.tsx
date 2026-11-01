import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allProducts as fallbackProducts, getProductBySlug as getFallbackProduct } from '@/data/products';
import { getStoredProducts, getStoredProductBySlug } from '@/lib/productsStore';
import ProductDetailsClient from '@/components/products/ProductDetailsClient';

export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const products = await getStoredProducts();
    return products.map((p) => ({
      slug: p.slug,
    }));
  } catch {
    return fallbackProducts.map((p) => ({
      slug: p.slug,
    }));
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let product = await getStoredProductBySlug(slug);
  if (!product) {
    product = getFallbackProduct(slug);
  }

  if (!product) {
    return {
      title: 'Product Not Found | STRIDE',
    };
  }

  return {
    title: `${product.name} | STRIDE High Performance Sportswear`,
    description: product.description,
    openGraph: {
      title: `${product.name} | GH₵ ${product.price.toLocaleString()} | STRIDE`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  let product = await getStoredProductBySlug(slug);
  if (!product) {
    product = getFallbackProduct(slug);
  }

  if (!product) {
    notFound();
  }

  const all = await getStoredProducts();
  const relatedProducts = all
    .filter((p) => p.id !== product.id)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 4);

  return (
    <ProductDetailsClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
