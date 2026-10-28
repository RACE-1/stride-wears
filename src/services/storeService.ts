import { client, isSanityConfigured } from '@/sanity/lib/client';
import {
  productsQuery,
  featuredProductsQuery,
  categoriesQuery,
  heroBannerQuery,
} from '@/sanity/lib/queries';
import {
  mockBanner,
  mockCategories,
  mockProducts,
  Product,
  Category,
  HeroBannerData,
} from '@/data/mockData';

export async function getHeroBanner(): Promise<HeroBannerData> {
  if (!isSanityConfigured) {
    return mockBanner;
  }
  try {
    const data = await client.fetch<HeroBannerData>(heroBannerQuery);
    return data || mockBanner;
  } catch (error) {
    console.warn('Sanity fetch failed for hero banner, falling back to mock data:', error);
    return mockBanner;
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!isSanityConfigured) {
    return mockCategories;
  }
  try {
    const data = await client.fetch<Category[]>(categoriesQuery);
    return data && data.length > 0 ? data : mockCategories;
  } catch (error) {
    console.warn('Sanity fetch failed for categories, falling back to mock data:', error);
    return mockCategories;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return mockProducts;
  }
  try {
    const data = await client.fetch<Product[]>(featuredProductsQuery);
    return data && data.length > 0 ? data : mockProducts;
  } catch (error) {
    console.warn('Sanity fetch failed for featured products, falling back to mock data:', error);
    return mockProducts;
  }
}

export async function getAllProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return mockProducts;
  }
  try {
    const data = await client.fetch<Product[]>(productsQuery);
    return data && data.length > 0 ? data : mockProducts;
  } catch (error) {
    console.warn('Sanity fetch failed for all products, falling back to mock data:', error);
    return mockProducts;
  }
}
