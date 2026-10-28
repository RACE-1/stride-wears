import type { Metadata } from 'next';
import { Noto_Sans, IBM_Plex_Sans } from 'next/font/google';
import './globals.css';
import { brand } from '@/lib/brand';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/navigation/Navbar';
import CartDrawer from '@/components/cart/CartDrawer';
import QuickViewModal from '@/components/products/QuickViewModal';
import SearchModal from '@/components/search/SearchModal';
import WishlistModal from '@/components/wishlist/WishlistModal';
import CheckoutModal from '@/components/checkout/CheckoutModal';

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: `${brand.name} | Born to Run - High Performance Sportswear`,
  description: brand.tagline,
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: brand.name,
    title: `${brand.name} | Born to Run - Engineered for Speed`,
    description: brand.tagline,
    images: [
      {
        url: '/images/products/shoe-1.svg',
        width: 1200,
        height: 630,
        alt: `${brand.name} High Performance Running Footwear`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${brand.name} | Born to Run - Engineered for Speed`,
    description: brand.tagline,
    images: ['/images/products/shoe-1.svg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${ibmPlexSans.variable} dark scroll-smooth`}>
      <head>
        <meta name="theme-color" content="#11191C" />
      </head>
      <body className="min-h-screen bg-[var(--bg)] text-ink antialiased overflow-x-hidden font-body selection:bg-[var(--accent)] selection:text-[var(--accent-ink)]">
        <CartProvider>
          <Navbar />
          {children}
          <CartDrawer />
          <QuickViewModal />
          <SearchModal />
          <WishlistModal />
          <CheckoutModal />
        </CartProvider>
      </body>
    </html>
  );
}
