import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { allProducts, getProductBySlug } from '@/data/products';
import ProductDetailsClient from '@/components/products/ProductDetailsClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

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
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Find 4 related products (prefer same category or other featured items)
  const relatedProducts = allProducts
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
