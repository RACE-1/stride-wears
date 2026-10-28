'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassPanel from '@/components/ui/GlassPanel';
import { Zap, Feather, ShieldCheck } from 'lucide-react';

export default function Technology() {
  const prefersReducedMotion = useReducedMotion();

  const callouts = [
    {
      id: 'upper',
      title: 'Breathable knit upper',
      desc: 'Zero-weight mesh that adapts to your foot',
      cardPos: 'lg:left-[2%] lg:top-[10%]',
      dotPos: { cx: 440, cy: 190 },
      linePath: 'M 250 140 L 350 140 L 440 190',
      align: 'left',
    },
    {
      id: 'midsole',
      title: 'Responsive midsole',
      desc: 'Foam that returns 85% of your energy',
      cardPos: 'lg:left-[2%] lg:bottom-[12%]',
      dotPos: { cx: 410, cy: 320 },
      linePath: 'M 250 370 L 340 370 L 410 320',
      align: 'left',
    },
    {
      id: 'plate',
      title: 'Carbon speed plate',
      desc: 'A stiff plate for a faster toe-off',
      cardPos: 'lg:right-[2%] lg:top-[12%]',
      dotPos: { cx: 580, cy: 230 },
      linePath: 'M 750 150 L 660 150 L 580 230',
      align: 'right',
    },
    {
      id: 'outsole',
      title: 'Traction outsole',
      desc: 'Grip that holds on wet roads',
      cardPos: 'lg:right-[2%] lg:bottom-[10%]',
      dotPos: { cx: 570, cy: 350 },
      linePath: 'M 750 380 L 650 380 L 570 350',
      align: 'right',
    },
  ];

  const featureCards = [
    {
      icon: Zap,
      title: 'Explosive energy return',
      desc: 'Dual-density ZoomX+ compound transfers forward kinetic energy with zero dissipation.',
    },
    {
      icon: Feather,
      title: 'Ultra lightweight at 210g',
      desc: 'Engineered mono-filament aeroweave trims every superfluous gram for effortless turnover.',
    },
    {
      icon: ShieldCheck,
      title: 'Durability tested for 800km',
      desc: 'High-abrasion carbon rubber lug array retains razor-sharp traction through extreme mileage.',
    },
  ];

  return (
    <section
      id="technology"
      data-theme="lime"
      className="relative z-20 -mt-8 sm:-mt-12 rounded-t-[36px] sm:rounded-t-[48px] overflow-hidden pt-20 sm:pt-24 pb-28 sm:pb-32 transition-colors duration-700"
      style={{
        backgroundColor: 'var(--bg-2)',
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, var(--bg-2) 0%, #101618 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header with eyebrow and title */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto"
        >
          <SectionHeading
            eyebrow="ENGINEERED FOR SPEED"
            title={
              <>
                Built to{' '}
                <span className="text-[var(--accent)] transition-colors duration-500">
                  outrun the clock.
                </span>
              </>
            }
            align="center"
          />
        </motion.div>

        {/* Center Stage: Shoe + Ghost Text "SPEED" + Callouts */}
        <div className="relative mt-12 lg:mt-16 w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center">
          {/* Huge .ghost-text word "SPEED" behind shoe */}
          <span
            aria-hidden="true"
            className="ghost-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-body font-black text-[22vw] lg:text-[19vw] tracking-[0.2em] uppercase select-none pointer-events-none z-0 opacity-80 whitespace-nowrap"
          >
            SPEED
          </span>

          {/* SVG Animated Connecting Lines (Desktop only) */}
          <svg
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-10"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)" />
              </linearGradient>
            </defs>

            {callouts.map((item, idx) => (
              <g key={item.id}>
                {/* 1px stroke animated path */}
                <motion.path
                  d={item.linePath}
                  stroke="url(#lineGrad)"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  fill="none"
                  initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3 + idx * 0.15,
                    ease: 'easeInOut',
                  }}
                />

                {/* Accent dot on the shoe part */}
                <motion.circle
                  cx={item.dotPos.cx}
                  cy={item.dotPos.cy}
                  r="5"
                  fill="var(--accent)"
                  initial={prefersReducedMotion ? false : { scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ delay: 0.8 + idx * 0.1, duration: 0.4 }}
                  className="shadow-sm"
                  style={{
                    filter: 'drop-shadow(0 0 6px var(--accent))',
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Center Lime Shoe Image with Float & Underglow */}
          <motion.div
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [-6, 6, -6],
                    rotate: [-1.5, 1.5, -1.5],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="relative z-10 w-[85vw] lg:w-[46vw] max-w-[620px] aspect-[16/10] flex items-center justify-center select-none"
          >
            {/* Elliptical Underglow */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 bottom-[4%] -translate-x-1/2 w-[40vw] h-[8vw] pointer-events-none rounded-[50%]"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgb(var(--accent-rgb) / 0.35) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            {/* Soft Dark Contact Shadow */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 bottom-[6%] -translate-x-1/2 w-[34vw] h-[5vw] pointer-events-none rounded-[50%]"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            <Image
              src="/images/shoe-lime.png"
              alt="Engineered STRIDE Technology Sneaker"
              width={900}
              height={580}
              loading="lazy"
              sizes="(max-width: 1024px) 85vw, (max-width: 1440px) 46vw, 620px"
              className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl transform -rotate-12"
            />
          </motion.div>

          {/* Four Desktop Callout Glass Cards */}
          {callouts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className={`hidden lg:block absolute ${c.cardPos} z-20 max-w-[270px] pointer-events-auto`}
            >
              <GlassPanel className="p-4 sm:p-5 rounded-[22px] border border-[var(--glass-border)] bg-[var(--glass)] hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgb(var(--accent-rgb)/0.2)] transition-all duration-300">
                <h4 className="text-white text-[18px] font-medium font-body leading-snug">
                  {c.title}
                </h4>
                <p className="text-muted text-[14px] font-normal font-body mt-1 leading-relaxed">
                  {c.desc}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Mobile 2x2 Callouts Grid (Under 1024px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 lg:hidden">
          {callouts.map((c, i) => (
            <motion.div
              key={c.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassPanel className="p-5 rounded-[22px]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" />
                  <h4 className="text-white text-[17px] font-medium font-body">
                    {c.title}
                  </h4>
                </div>
                <p className="text-muted text-[14px] font-normal font-body pl-4.5">
                  {c.desc}
                </p>
              </GlassPanel>
            </motion.div>
          ))}
        </div>

        {/* Bottom 3-Column Glass Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-20 lg:mt-24">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={prefersReducedMotion ? {} : { y: -8 }}
                className="transition-transform duration-300"
              >
                <GlassPanel className="p-7 sm:p-8 rounded-[22px] h-full flex flex-col items-start border border-[var(--glass-border)] hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgb(var(--accent-rgb)/0.25)] transition-all duration-300 group">
                  {/* Icon in Accent Circle */}
                  <div className="w-12 h-12 rounded-full bg-[rgb(var(--accent-rgb)/0.16)] border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] text-[var(--accent)] flex items-center justify-center shrink-0 mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight">
                    {feat.title}
                  </h3>

                  <p className="text-muted text-sm sm:text-base font-body font-normal mt-2.5 leading-relaxed">
                    {feat.desc}
                  </p>
                </GlassPanel>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
