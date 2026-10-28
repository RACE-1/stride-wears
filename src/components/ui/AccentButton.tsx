'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export interface AccentButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'solid';
  children: React.ReactNode;
  className?: string;
  showChevron?: boolean;
}

export default function AccentButton({
  variant = 'solid',
  children,
  className,
  showChevron = variant === 'outline',
  ...props
}: AccentButtonProps) {
  return (
    <button
      className={cn(
        'group inline-flex items-center justify-center font-bold tracking-wide rounded-full px-7 py-3.5 cursor-pointer text-[17px] select-none transition-all duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2',
        variant === 'outline' && [
          'border border-[color-mix(in_srgb,var(--accent)_55%,#3a4d44)]',
          'bg-[#182125]/40 text-white backdrop-blur-xs',
          'hover:bg-[var(--accent)] hover:text-[var(--accent-ink)] hover:border-[var(--accent)]',
          'shadow-sm hover:shadow-[0_0_25px_rgb(var(--accent-rgb)/0.35)]',
        ],
        variant === 'solid' && [
          'bg-[var(--accent)] hover:brightness-110',
          'text-[var(--accent-ink)] font-extrabold shadow-md hover:shadow-lg',
        ],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showChevron && (
        <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </button>
  );
}
