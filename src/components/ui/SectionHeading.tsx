import React from 'react';
import { cn } from '@/lib/utils';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  align = 'center',
  className,
}: SectionHeadingProps) {
  const alignmentClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  return (
    <div className={cn('flex flex-col', alignmentClass, className)}>
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent)] mb-2">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
        {title}
      </h2>
    </div>
  );
}
