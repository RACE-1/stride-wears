'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  children?: React.ReactNode;
  className?: string;
  label?: string;
}

export default function IconButton({
  icon: Icon,
  children,
  className,
  label,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'w-[46px] h-[46px] rounded-full shrink-0 flex items-center justify-center cursor-pointer',
        'border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] text-white',
        'bg-[color-mix(in_srgb,var(--accent)_18%,#1d2b25)]',
        'shadow-sm transition-all duration-300',
        'hover:brightness-125 hover:border-[var(--accent)] hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-2',
        className
      )}
      {...props}
    >
      {Icon ? <Icon className="w-5 h-5 text-current" /> : children}
    </button>
  );
}
