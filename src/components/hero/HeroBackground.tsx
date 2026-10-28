import React from 'react';

export default function HeroBackground() {
  return (
    <div
      data-component="HeroBackground"
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
    >
      {/* Base: dark teal-charcoal #182125 with vignette */}
      <div className="absolute inset-0 bg-[#182125] bg-[radial-gradient(ellipse_at_center,_#182125_0%,_#0f1618_100%)]" />

      {/* Diagonal light beam layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 12% 100%)',
          background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
        }}
      />

      {/* Big soft radial glow of var(--accent) at 16% opacity centered at 66% x / 62% y */}
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-700"
        style={{
          background: 'radial-gradient(circle 35vw at 66% 62%, rgb(var(--accent-rgb) / 0.16) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grain / noise overlay at 4% opacity */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
