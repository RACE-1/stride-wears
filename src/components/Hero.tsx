import Image from 'next/image';
import Link from 'next/link';
import { HeroBannerData } from '@/data/mockData';

interface HeroProps {
  banner: HeroBannerData;
}

export default function Hero({ banner }: HeroProps) {
  return (
    <section className="relative w-full bg-neutral-900 text-white overflow-hidden">
      {/* Visual media banner */}
      <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] min-h-[480px]">
        <Image
          src={banner.imageUrl}
          alt={banner.headline}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-75 hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* Content Overlay */}
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16">
          <div className="max-w-2xl space-y-3 sm:space-y-4">
            {banner.tag && (
              <span className="inline-block uppercase tracking-widest text-xs font-bold bg-white text-black px-3 py-1 rounded-sm">
                {banner.tag}
              </span>
            )}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase italic leading-none drop-shadow-md">
              {banner.headline}
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-neutral-200 font-medium max-w-xl">
              {banner.subtitle}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href={banner.ctaLink || '#products'}
                className="bg-white text-black hover:bg-neutral-200 font-bold px-7 py-3 rounded-full transition-all text-sm uppercase tracking-wide inline-flex items-center shadow-lg hover:shadow-xl transform active:scale-95"
              >
                {banner.ctaText || 'Shop Now'}
              </Link>
              <Link
                href="#products"
                className="bg-black/60 backdrop-blur-md text-white hover:bg-black/80 border border-white/20 font-bold px-7 py-3 rounded-full transition-all text-sm uppercase tracking-wide inline-flex items-center"
              >
                Explore Sneakers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
