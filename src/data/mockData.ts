export interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  category: string;
  images: string[];
  description: string;
  sizes: string[];
  colors: string[];
  isFeatured: boolean;
  inStock: boolean;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface HeroBannerData {
  _id: string;
  headline: string;
  subtitle: string;
  tag: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export const mockBanner: HeroBannerData = {
  _id: 'banner-1',
  headline: 'FEEL THE UNREAL',
  subtitle: 'The next era of Air Max is here. Built with dual-pressure Air chambers for an unreal ride and non-stop energy return.',
  tag: 'AIR MAX DN',
  ctaText: 'Shop Air Max Dn',
  ctaLink: '#products',
  imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80',
};

export const mockCategories: Category[] = [
  {
    _id: 'cat-1',
    title: 'All Shoes',
    slug: 'all',
    description: 'Explore the complete Nike footwear catalog',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'cat-2',
    title: 'Running',
    slug: 'running',
    description: 'Engineered for speed, endurance, and everyday miles',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'cat-3',
    title: 'Basketball',
    slug: 'basketball',
    description: 'Court-ready traction, lockdown, and high-flying impact protection',
    image: 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'cat-4',
    title: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Iconic street style and timeless silhouettes',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
  },
  {
    _id: 'cat-5',
    title: 'Jordan',
    slug: 'jordan',
    description: 'Flight heritage, championship DNA, and legendary style',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
  },
];

export const mockProducts: Product[] = [
  {
    _id: 'prod-1',
    name: 'Nike Air Max Dn',
    slug: 'nike-air-max-dn',
    price: 160,
    originalPrice: 180,
    badge: 'Just Dropped',
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Features our Dynamic Air unit system of dual-pressure tubes, creating a reactive sensation with every step.',
    sizes: ['US 7', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 11', 'US 12'],
    colors: ['All Black', 'Pure Platinum', 'Volt Red'],
    isFeatured: true,
    inStock: true,
  },
  {
    _id: 'prod-2',
    name: 'Nike Dunk Low Retro',
    slug: 'nike-dunk-low-retro',
    price: 115,
    badge: 'Best Seller',
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Created for the hardwood but taken to the streets, the 80s b-ball icon returns with perfectly shined overlays and classic team colors.',
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 10.5', 'US 11'],
    colors: ['White / Black', 'University Blue'],
    isFeatured: true,
    inStock: true,
  },
  {
    _id: 'prod-3',
    name: 'Air Jordan 1 Retro High OG',
    slug: 'air-jordan-1-retro-high-og',
    price: 180,
    originalPrice: 200,
    badge: 'Iconic',
    category: 'Jordan',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Familiar yet always fresh, the iconic Air Jordan 1 is remastered for todays sneakerhead culture.',
    sizes: ['US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12'],
    colors: ['Chicago Red', 'Bred Toe', 'Shadow Gray'],
    isFeatured: true,
    inStock: true,
  },
  {
    _id: 'prod-4',
    name: 'Nike Invincible 3',
    slug: 'nike-invincible-3',
    price: 180,
    badge: 'Maximum Cushioning',
    category: 'Running',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'With maximum cushioning to support every mile, the Invincible 3 gives you our highest level of comfort underfoot.',
    sizes: ['US 7.5', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    colors: ['Summit White', 'Black/Reflect Silver'],
    isFeatured: true,
    inStock: true,
  },
  {
    _id: 'prod-5',
    name: 'Nike LeBron XXI',
    slug: 'nike-lebron-xxi',
    price: 200,
    originalPrice: 225,
    badge: 'Pro Performance',
    category: 'Basketball',
    images: [
      'https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Engineered for low-to-the-ground responsiveness and agility with a 360-degree zonal cabling system.',
    sizes: ['US 8', 'US 9', 'US 10', 'US 11', 'US 12', 'US 13'],
    colors: ['Akronite Gold', 'Violet Dust'],
    isFeatured: true,
    inStock: true,
  },
  {
    _id: 'prod-6',
    name: 'Nike Air Force 1 07',
    slug: 'nike-air-force-1-07',
    price: 115,
    badge: 'Classic Heritage',
    category: 'Lifestyle',
    images: [
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'The radiance lives on in the Nike Air Force 1 07, the b-ball icon that puts a fresh spin on what you know best.',
    sizes: ['US 6', 'US 7', 'US 8', 'US 9', 'US 10', 'US 11', 'US 12'],
    colors: ['Triple White', 'Triple Black'],
    isFeatured: true,
    inStock: true,
  },
];
