import fs from 'fs';
import path from 'path';
import { Product, allProducts as initialProducts } from '@/data/products';

const DB_PATH = path.join(process.cwd(), 'src', 'data', 'products-db.json');

// In-memory cache for fast reads
let memoryCache: Product[] | null = null;

/**
 * Ensure database file exists with initial seeded products
 */
function ensureDb(): Product[] {
  if (memoryCache) {
    return memoryCache;
  }

  try {
    if (fs.existsSync(DB_PATH)) {
      const fileData = fs.readFileSync(DB_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memoryCache = parsed;
        return memoryCache;
      }
    }
  } catch (err) {
    console.error('Error reading products-db.json, falling back to initial data:', err);
  }

  // Seed with initial products
  memoryCache = [...initialProducts];
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(memoryCache, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving initial products-db.json:', err);
  }

  return memoryCache;
}

/**
 * Save current products to DB file
 */
function saveDb(products: Product[]): void {
  memoryCache = products;
  try {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DB_PATH, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving products-db.json:', err);
  }
}

/**
 * Generate a clean URL-friendly slug
 */
export function generateSlug(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || `product-${Date.now()}`;
}

export async function getStoredProducts(): Promise<Product[]> {
  return ensureDb();
}

export async function getStoredProductById(id: string): Promise<Product | undefined> {
  const products = ensureDb();
  return products.find((p) => p.id === id);
}

export async function getStoredProductBySlug(slug: string): Promise<Product | undefined> {
  const products = ensureDb();
  return products.find((p) => p.slug === slug);
}

export async function createStoredProduct(
  data: Partial<Product> & { name: string; price: number; image: string }
): Promise<Product> {
  const products = ensureDb();
  
  const id = data.id || `stride-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  let slug = data.slug ? generateSlug(data.slug) : generateSlug(data.name);

  // Ensure unique slug
  if (products.some((p) => p.slug === slug)) {
    slug = `${slug}-${Math.random().toString(36).substring(2, 6)}`;
  }

  const newProduct: Product = {
    id,
    slug,
    name: data.name,
    category: (data.category as Product['category']) || 'Apparel',
    gender: (data.gender as Product['gender']) || 'Unisex',
    price: Number(data.price),
    originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
    image: data.image,
    gallery: data.gallery && data.gallery.length > 0 ? data.gallery : [data.image],
    sizes: data.sizes && data.sizes.length > 0 ? data.sizes : ['S', 'M', 'L', 'XL'],
    colors: data.colors && data.colors.length > 0 ? data.colors : [{ name: 'Default', hex: '#00E5FF' }],
    rating: data.rating !== undefined ? Number(data.rating) : 5.0,
    reviewsCount: data.reviewsCount !== undefined ? Number(data.reviewsCount) : 0,
    description: data.description || '',
    features: data.features || [],
    isFeatured: Boolean(data.isFeatured),
    tag: (data.tag as Product['tag']) || (data.isFeatured ? 'NEW' : undefined),
    inStock: data.inStock !== undefined ? Boolean(data.inStock) : true,
  };

  const updatedList = [newProduct, ...products];
  saveDb(updatedList);
  return newProduct;
}

export async function updateStoredProduct(
  id: string,
  updates: Partial<Product>
): Promise<Product | null> {
  const products = ensureDb();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return null;
  }

  const existing = products[index];
  const updatedProduct: Product = {
    ...existing,
    ...updates,
    id: existing.id, // preserve id
    price: updates.price !== undefined ? Number(updates.price) : existing.price,
    originalPrice: updates.originalPrice !== undefined ? Number(updates.originalPrice) : existing.originalPrice,
    slug: updates.slug ? generateSlug(updates.slug) : existing.slug,
  };

  products[index] = updatedProduct;
  saveDb(products);
  return updatedProduct;
}

export async function deleteStoredProduct(id: string): Promise<boolean> {
  const products = ensureDb();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return false;
  }

  products.splice(index, 1);
  saveDb(products);
  return true;
}

export async function getStoredCategories(): Promise<string[]> {
  const products = ensureDb();
  const set = new Set<string>();
  products.forEach((p) => set.add(p.category));
  return Array.from(set);
}
