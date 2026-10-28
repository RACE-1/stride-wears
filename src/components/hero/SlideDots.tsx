'use client';

import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface SlideDotsProps {
  total?: number;
  active: number;
  onChange: (index: number) => void;
  className?: string;
}

export default function SlideDots({
  total = 3,
  active,
  onChange,
  className,
}: SlideDotsProps) {
  return (
    <div
      data-component="SlideDots"
      role="tablist"
      aria-label="Colorway Slides"
      className={cn(
        'z-30 pointer-events-auto',
        // Desktop: vertical stack at x=90% (right ~5vw), vertically centered
        'lg:fixed lg:right-[4vw] xl:right-[5vw] lg:top-1/2 lg:-translate-y-1/2 lg:flex lg:flex-col lg:gap-[20px]',
        // Under 1024px: horizontal at bottom center
        'max-lg:flex max-lg:flex-row max-lg:items-center max-lg:justify-center max-lg:gap-4 max-lg:w-full max-lg:py-4',
        className
      )}
    >
      {Array.from({ length: total }).map((_, idx) => {
        const isActive = active === idx;
        return (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => onChange(idx)}
            className="group relative flex items-center justify-center p-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-full"
          >
            <motion.span
              animate={{
                scale: isActive ? 1.4 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className={cn(
                'rounded-full block transition-all duration-500',
                isActive
                  ? 'w-[10px] h-[10px] bg-[var(--accent)] shadow-[0_0_18px_var(--accent)]'
                  : 'w-[10px] h-[10px] bg-[#C9CFCC]/80 group-hover:bg-white group-hover:scale-110'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
