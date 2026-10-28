import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  width?: number;
  height?: number;
}

export default function Logo({
  className,
  showText = true,
  width = 150,
  height = 38,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00E5FF] rounded-sm select-none', className)}
      aria-label="STRIDE Home"
    >
      <Image
        src="/logo.svg"
        alt="STRIDE Logo"
        width={width}
        height={height}
        priority
        className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}
