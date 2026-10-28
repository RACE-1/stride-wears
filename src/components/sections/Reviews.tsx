'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import GlassPanel from '@/components/ui/GlassPanel';
import { Star, CheckCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

interface Review {
  id: string;
  name: string;
  initials: string;
  role: string;
  text: string;
  rating: number;
}

const reviewsData: Review[] = [
  {
    id: 'rev-1',
    name: 'Marcus Vance',
    initials: 'MV',
    role: 'Marathon Pacer',
    text: 'Trained through 300+ miles on rain-slicked asphalt. The kinetic return of the foam and plate combo saved my calves during 22-mile long runs.',
    rating: 5,
  },
  {
    id: 'rev-2',
    name: 'Jessica Lin',
    initials: 'JL',
    role: 'CrossFit Coach',
    text: 'Finally a shoe that gives explosive bounce without rolling ankles on lateral box jumps. The chassis lockdown is phenomenal.',
    rating: 5,
  },
  {
    id: 'rev-3',
    name: 'David Chen',
    initials: 'DC',
    role: 'Daily Commuter',
    text: "I walk 14,000 steps a day across city pavement. These are easily the most comfortable sneakers I've ever laced up. True to size.",
    rating: 5,
  },
  {
    id: 'rev-4',
    name: 'Sarah Jenkins',
    initials: 'SJ',
    role: 'Half Marathoner',
    text: 'Shaved 4 minutes off my half marathon PR in Seattle. The rubber lug array on wet concrete gives you total cornering confidence.',
    rating: 5,
  },
  {
    id: 'rev-5',
    name: 'Tyler Brooks',
    initials: 'TB',
    role: 'Track & Field',
    text: 'The carbon speed plate provides that aggressive forward propulsion off the forefoot. Ultra-lightweight with zero foot fatigue.',
    rating: 5,
  },
  {
    id: 'rev-6',
    name: 'Emily Zhao',
    initials: 'EZ',
    role: 'Sneaker Enthusiast',
    text: 'The silhouette and neon glow details look even sharper in person than the photos. Constant compliments everywhere I wear them.',
    rating: 5,
  },
  {
    id: 'rev-7',
    name: 'Carlos Morales',
    initials: 'CM',
    role: 'Fitness Athlete',
    text: 'Suffered from plantar tension for years until switching to STRIDE. The dual-density arch support and heel cup are revolutionary.',
    rating: 5,
  },
  {
    id: 'rev-8',
    name: 'Chloe Bennett',
    initials: 'CB',
    role: 'Sprint Coach',
    text: 'Toe box gives just enough room for natural toe splay while the midfoot stays locked down like a second skin. Worth every dollar.',
    rating: 5,
  },
];

const row1 = reviewsData.slice(0, 4);
const row2 = reviewsData.slice(4, 8);

function StatCounter({
  end,
  decimals = 0,
  prefix = '',
  suffix = '',
  label,
}: {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleViewportEnter = () => {
    if (hasTriggered) return;
    setHasTriggered(true);

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const durationMs = 1800;
    const startTime = performance.now();

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(ease * end);

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(frame);
  };

  return (
    <motion.div
      onViewportEnter={handleViewportEnter}
      viewport={{ once: true, margin: '-60px' }}
      className="flex flex-col items-center justify-center p-6 text-center"
    >
      <span className="font-display font-bold text-[var(--accent)] text-4xl sm:text-5xl lg:text-[clamp(40px,5vw,64px)] tracking-tight leading-none">
        {prefix}
        {count.toFixed(decimals)}
        {suffix}
      </span>
      <span className="text-muted text-sm sm:text-base font-body font-normal mt-2.5">
        {label}
      </span>
    </motion.div>
  );
}

export default function Reviews() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="reviews"
      data-theme="lime"
      className="relative z-20 py-20 sm:py-24 overflow-hidden"
    >
      {/* Inline styles for continuous seamless infinite marquee */}
      <style jsx global>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
        }
        .marquee-left {
          animation: scrollLeft 45s linear infinite;
        }
        .marquee-right {
          animation: scrollRight 45s linear infinite;
        }
        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-left,
          .marquee-right {
            animation: none !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-14 sm:mb-16">
        <SectionHeading
          eyebrow="COMMUNITY"
          title="Tested by the world's fastest."
          align="center"
        />

        {/* Top Big Stats Row of 3 Items */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-[28px] border border-[var(--glass-border)] bg-[var(--surface)]/45 backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--glass-border)] shadow-xl"
        >
          <StatCounter end={5} suffix="M+" label="Satisfied customers" />
          <StatCounter end={4.9} decimals={1} suffix="/5" label="Average rating" />
          <StatCounter end={30} suffix=" days" label="Free returns" />
        </motion.div>
      </div>

      {/* Two-Row Infinite Marquee Container with Left & Right Fade Masks */}
      <div className="relative w-full overflow-hidden marquee-container space-y-6">
        {/* Left Fade Mask */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 sm:w-40 md:w-60 z-20"
          style={{
            background:
              'linear-gradient(to right, var(--bg) 0%, rgba(24, 33, 37, 0) 100%)',
          }}
        />

        {/* Right Fade Mask */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 sm:w-40 md:w-60 z-20"
          style={{
            background:
              'linear-gradient(to left, var(--bg) 0%, rgba(24, 33, 37, 0) 100%)',
          }}
        />

        {/* Row 1: Scrolling LEFT */}
        <div
          className={`flex w-max marquee-track ${prefersReducedMotion ? '' : 'marquee-left'}`}
        >
          {[...row1, ...row1, ...row1, ...row1].map((review, i) => (
            <ReviewCard key={`r1-${review.id}-${i}`} review={review} />
          ))}
        </div>

        {/* Row 2: Scrolling RIGHT */}
        <div
          className={`flex w-max marquee-track ${prefersReducedMotion ? '' : 'marquee-right'}`}
        >
          {[...row2, ...row2, ...row2, ...row2].map((review, i) => (
            <ReviewCard key={`r2-${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[300px] sm:w-[360px] shrink-0 mx-3 select-none">
      <GlassPanel className="p-5 sm:p-6 rounded-[24px] border border-[var(--glass-border)] bg-[var(--surface)]/50 hover:border-[var(--accent)] hover:shadow-[0_0_25px_rgb(var(--accent-rgb)/0.2)] transition-all duration-300 flex flex-col justify-between h-[210px]">
        <div>
          {/* 5 Accent Stars */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: review.rating }).map((_, idx) => (
              <Star
                key={idx}
                className="w-4 h-4 fill-[var(--accent)] text-[var(--accent)]"
              />
            ))}
          </div>

          {/* 2-3 Line Review Text */}
          <p className="text-white text-[14px] sm:text-[15px] leading-[1.6] line-clamp-3 font-body font-normal">
            &ldquo;{review.text}&rdquo;
          </p>
        </div>

        {/* Author Avatar & Verified Buyer Info */}
        <div className="flex items-center gap-3 pt-3 border-t border-[var(--glass-border)]">
          {/* 40px Circular Avatar with Initials */}
          <div
            className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center font-display font-bold text-xs text-[var(--accent)] border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] shadow-xs"
            style={{
              background:
                'radial-gradient(circle at 35% 35%, rgb(var(--accent-rgb) / 0.3) 0%, rgba(255, 255, 255, 0.05) 100%)',
            }}
          >
            {review.initials}
          </div>

          <div className="flex flex-col">
            <span className="font-body font-semibold text-white text-sm leading-tight">
              {review.name}
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <CheckCircle className="w-3 h-3 text-[var(--accent)]" />
              <span className="text-muted text-xs font-normal">Verified buyer</span>
              <span className="text-muted text-xs">• {review.role}</span>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
}
