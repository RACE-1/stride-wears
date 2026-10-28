'use client';

import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SlideColorway } from '@/lib/data';

interface StatsBarProps {
  currentSlide: SlideColorway;
}

export default function StatsBar({ currentSlide }: StatsBarProps) {
  const prefersReducedMotion = useReducedMotion();

  const statItems = [
    { key: 'price', value: currentSlide.price, label: 'Price' },
    { key: 'discount', value: currentSlide.discount, label: 'Discount' },
    { key: 'customers', value: currentSlide.satisfiedCustomers, label: 'Satisfied' },
    { key: 'sold', value: currentSlide.todaySold, label: 'Today sold' },
  ];

  return (
    <div
      data-component="StatsBar"
      className="relative z-20 w-full max-w-[360px] sm:max-w-xl lg:w-[44vw] lg:max-w-[540px] xl:max-w-[620px] mx-auto lg:mx-0 lg:absolute lg:left-[42%] xl:left-[44%] lg:bottom-7 xl:bottom-10 pointer-events-auto mt-4 lg:mt-0"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D tilted panel container */}
      <div
        className="relative rounded-[22px] p-4 sm:p-5 lg:p-6 transition-all duration-700"
        style={{
          background: 'rgba(112, 150, 100, 0.38)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: '1px solid rgba(200, 240, 170, 0.25)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
          transform:
            typeof window !== 'undefined' && window.innerWidth < 1024
              ? 'none'
              : 'perspective(900px) rotateX(7deg) rotateY(-5deg) rotateZ(-3deg)',
        }}
      >
        {/* Glowing Accent Orb 1: Bottom-Left Corner */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
          className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] rounded-full bg-[var(--accent)] pointer-events-none transition-colors duration-700 z-30"
          style={{
            boxShadow: '0 0 35px rgb(var(--accent-rgb) / 0.8)',
          }}
        />

        {/* Glowing Accent Orb 2: Top-Right Corner */}
        <motion.div
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.12, 1],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
          aria-hidden="true"
          className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-[clamp(28px,2.8vw,42px)] h-[clamp(28px,2.8vw,42px)] rounded-full bg-[var(--accent)] pointer-events-none transition-colors duration-700 z-30"
          style={{
            boxShadow: '0 0 35px rgb(var(--accent-rgb) / 0.8)',
          }}
        />

        {/* Four Columns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 items-center">
          {statItems.map((item) => (
            <div key={item.key} className="flex flex-col">
              {/* Animated Value on Top */}
              <div className="h-[32px] sm:h-[38px] overflow-hidden relative">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={`${item.key}-${item.value}`}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="font-body font-medium text-white text-[clamp(20px,2vw,30px)] leading-none block select-none"
                  >
                    {item.value}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Subtitle Label Underneath */}
              <span className="text-white/85 text-[12px] sm:text-[13px] font-body font-normal mt-1 leading-tight select-none">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
