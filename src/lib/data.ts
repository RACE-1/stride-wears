export interface ShoeSpec {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  content: string;
  avatar?: string;
}

export interface ProductColorway {
  name: string;
  theme: 'lime' | 'orange' | 'blue';
  image: string;
}

export interface CollectionProduct {
  id: string;
  name: string;
  watermark: string;
  category: 'Running' | 'Training' | 'Lifestyle';
  price: number;
  oldPrice?: number;
  tag?: string;
  rating: number;
  reviewsCount: number;
  colorways: ProductColorway[];
}

export interface SlideColorway {
  id: string;
  theme: 'lime' | 'orange' | 'blue';
  name: string;
  shoeImage: string;
  accentColor: string;
  accentRgb: string;
  price: string;
  discount: string;
  satisfiedCustomers: string;
  todaySold: string;
  headlineLight: string;
  headlineBold: string;
}

export const slides: SlideColorway[] = [
  {
    id: 'slide-lime',
    theme: 'lime',
    name: 'Volt Stride',
    shoeImage: '/images/shoe-lime.png',
    accentColor: '#8EF03A',
    accentRgb: '142 240 58',
    price: '$150',
    discount: '10%',
    satisfiedCustomers: '5M+',
    todaySold: '1k+',
    headlineLight: 'Born',
    headlineBold: 'TO RUN',
  },
  {
    id: 'slide-orange',
    theme: 'orange',
    name: 'Solar Stride',
    shoeImage: '/images/shoe-orange.png',
    accentColor: '#FF7A1A',
    accentRgb: '255 122 26',
    price: '$165',
    discount: '15%',
    satisfiedCustomers: '5M+',
    todaySold: '1k+',
    headlineLight: 'Born',
    headlineBold: 'TO RUN',
  },
  {
    id: 'slide-blue',
    theme: 'blue',
    name: 'Cobalt Stride',
    shoeImage: '/images/shoe-blue.png',
    accentColor: '#2BB3FF',
    accentRgb: '43 179 255',
    price: '$140',
    discount: '8%',
    satisfiedCustomers: '5M+',
    todaySold: '1k+',
    headlineLight: 'Born',
    headlineBold: 'TO RUN',
  },
];

export const collectionProducts: CollectionProduct[] = [
  {
    id: 'prod-1',
    name: 'STRIDE Kinetic 1.0',
    watermark: 'KINETIC',
    category: 'Running',
    price: 180,
    oldPrice: 210,
    tag: 'NEW',
    rating: 4.9,
    reviewsCount: 142,
    colorways: [
      { name: 'Volt Lime', theme: 'lime', image: '/images/products/shoe-1-lime.png' },
      { name: 'Solar Flare', theme: 'orange', image: '/images/products/shoe-1-orange.png' },
      { name: 'Cobalt Blue', theme: 'blue', image: '/images/products/shoe-1-blue.png' },
    ],
  },
  {
    id: 'prod-2',
    name: 'STRIDE AeroVolt X',
    watermark: 'AEROVOLT',
    category: 'Running',
    price: 160,
    oldPrice: 180,
    tag: '-10%',
    rating: 4.8,
    reviewsCount: 96,
    colorways: [
      { name: 'Volt Lime', theme: 'lime', image: '/images/products/shoe-2-lime.png' },
      { name: 'Solar Flare', theme: 'orange', image: '/images/products/shoe-2-orange.png' },
      { name: 'Cobalt Blue', theme: 'blue', image: '/images/products/shoe-2-blue.png' },
    ],
  },
  {
    id: 'prod-3',
    name: 'STRIDE Apex Trainer',
    watermark: 'APEX',
    category: 'Training',
    price: 145,
    tag: 'BEST SELLER',
    rating: 4.9,
    reviewsCount: 210,
    colorways: [
      { name: 'Volt Lime', theme: 'lime', image: '/images/products/shoe-3-lime.png' },
      { name: 'Solar Flare', theme: 'orange', image: '/images/products/shoe-3-orange.png' },
      { name: 'Cobalt Blue', theme: 'blue', image: '/images/products/shoe-3-blue.png' },
    ],
  },
  {
    id: 'prod-4',
    name: 'STRIDE Carbon Shift',
    watermark: 'CARBON',
    category: 'Training',
    price: 190,
    oldPrice: 220,
    tag: '-15%',
    rating: 5.0,
    reviewsCount: 78,
    colorways: [
      { name: 'Volt Lime', theme: 'lime', image: '/images/products/shoe-4-lime.png' },
      { name: 'Solar Flare', theme: 'orange', image: '/images/products/shoe-4-orange.png' },
      { name: 'Cobalt Blue', theme: 'blue', image: '/images/products/shoe-4-blue.png' },
    ],
  },
  {
    id: 'prod-5',
    name: 'STRIDE Metro Drift',
    watermark: 'METRO',
    category: 'Lifestyle',
    price: 135,
    tag: 'NEW',
    rating: 4.7,
    reviewsCount: 64,
    colorways: [
      { name: 'Volt Lime', theme: 'lime', image: '/images/products/shoe-5-lime.png' },
      { name: 'Solar Flare', theme: 'orange', image: '/images/products/shoe-5-orange.png' },
      { name: 'Cobalt Blue', theme: 'blue', image: '/images/products/shoe-5-blue.png' },
    ],
  },
  {
    id: 'prod-6',
    name: 'STRIDE Horizon Zero',
    watermark: 'HORIZON',
    category: 'Lifestyle',
    price: 150,
    tag: 'POPULAR',
    rating: 4.8,
    reviewsCount: 115,
    colorways: [
      { name: 'Volt Lime', theme: 'lime', image: '/images/products/shoe-6-lime.png' },
      { name: 'Solar Flare', theme: 'orange', image: '/images/products/shoe-6-orange.png' },
      { name: 'Cobalt Blue', theme: 'blue', image: '/images/products/shoe-6-blue.png' },
    ],
  },
];

export const initialShoeSpecs: ShoeSpec[] = [
  { id: '1', label: 'Weight', value: '235g', detail: 'Ultra-light aeroweave chassis' },
  { id: '2', label: 'Cushioning', value: 'ZoomX+', detail: 'Proprietary dual-density energy foam' },
  { id: '3', label: 'Drop', value: '8mm', detail: 'Optimized biomechanical transition' },
  { id: '4', label: 'Traction', value: 'GripCompound', detail: 'All-weather carbon rubber lug array' },
];

export const initialReviews: ReviewItem[] = [
  {
    id: '1',
    author: 'Marcus Vance',
    role: 'Marathon Pacer',
    rating: 5,
    content: 'The most responsive shoe I have stepped into this season. The energy return on long tempos is unmatched.',
  },
  {
    id: '2',
    author: 'Elena Rostova',
    role: 'Triathlon Coach',
    rating: 5,
    content: 'Flawless lockdown and supreme breathability. STRIDE sets the benchmark for speed and ergonomic comfort.',
  },
];
