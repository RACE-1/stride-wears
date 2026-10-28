'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import AccentButton from '@/components/ui/AccentButton';
import { Truck, RotateCcw, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Cta() {
  const prefersReducedMotion = useReducedMotion();

  // Email capture state
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setErrorMessage('');
  };

  const trustBadges = [
    { icon: Truck, text: 'Free 2-day delivery' },
    { icon: RotateCcw, text: '30-day wear trial' },
    { icon: ShieldCheck, text: '2-year warranty' },
  ];

  return (
    <section
      id="cta"
      data-theme="lime"
      className="relative z-20 py-20 sm:py-24 px-6 lg:px-12 max-w-7xl mx-auto overflow-visible select-none"
    >
      {/* Outer Big Glass Panel (max-w-[1200px], radius 40px, padding 80px 64px on desktop) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[1200px] mx-auto rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 lg:p-16 lg:py-20 border border-[var(--glass-border)] bg-[var(--surface)]/45 backdrop-blur-xl shadow-2xl overflow-visible"
        style={{
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        }}
      >
        {/* Diagonal Light Beam (clipped to panel boundary) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[32px] sm:rounded-[40px] pointer-events-none overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              clipPath: 'polygon(65% 0, 100% 0, 100% 100%, 12% 100%)',
              background:
                'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0))',
            }}
          />

          {/* Big Accent Radial Glow at the Right */}
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-700"
            style={{
              background:
                'radial-gradient(circle at 80% 50%, rgb(var(--accent-rgb) / 0.22) 0%, transparent 65%)',
            }}
          />
        </div>

        {/* Content Grid: Left Column (Text & CTAs) + Right Column (Bursting Shoe) */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center overflow-visible">
          {/* Left Column (Text, Actions, Badges) */}
          <div className="lg:col-span-7 flex flex-col items-start order-last lg:order-first">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-[var(--accent)] block mb-3">
              READY WHEN YOU ARE
            </span>

            {/* Headline: Line 1 (IBM Plex Sans 700 white), Line 2 (Noto Sans 300 accent) */}
            <h2 className="text-3xl sm:text-5xl lg:text-[clamp(36px,5.2vw,68px)] tracking-tight leading-[0.95] uppercase">
              <span className="font-display font-bold text-white block">
                Your next PB
              </span>
              <span className="font-body font-light text-[var(--accent)] block mt-1">
                starts here.
              </span>
            </h2>

            {/* Muted Paragraph */}
            <p className="text-muted text-base sm:text-lg max-w-md mt-5 sm:mt-6 leading-relaxed font-body font-normal">
              Free shipping on orders over $75 and 30 days to change your mind.
            </p>

            {/* Button Row: Solid "Order Now" & Outline "Find your size" */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-7 sm:mt-8 w-full sm:w-auto">
              <AccentButton
                variant="solid"
                className="w-full sm:w-auto px-8 py-3.5 text-base shadow-md hover:shadow-lg"
              >
                Order Now
              </AccentButton>
              <AccentButton
                variant="outline"
                className="w-full sm:w-auto px-7 py-3.5 text-base"
              >
                Find your size
              </AccentButton>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-5 sm:gap-6 mt-8 sm:mt-10 pt-6 border-t border-[var(--glass-border)] w-full">
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.text} className="flex items-center gap-2 text-xs text-white/90 font-medium">
                    <Icon className="w-4 h-4 text-[var(--accent)] shrink-0" />
                    <span>{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Shoe Bursting Out of the Frame */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center order-first lg:order-last">
            {/* Huge .ghost-text "GO" Watermark Behind Shoe */}
            <span
              aria-hidden="true"
              className="ghost-text absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-body font-black text-[32vw] sm:text-[25vw] lg:text-[18vw] leading-none tracking-widest uppercase select-none pointer-events-none z-0 opacity-70 whitespace-nowrap"
            >
              GO
            </span>

            {/* Shoe Container: rotated, overflowing the top-right of panel on desktop */}
            <motion.div
              initial={prefersReducedMotion ? false : { x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-[80vw] lg:w-[42vw] lg:max-w-[580px] lg:absolute lg:-top-24 lg:-right-12 pointer-events-none select-none"
            >
              {/* Idle floating animation */}
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
                className="relative w-full aspect-[16/10] flex items-center justify-center"
              >
                {/* Underglow Blurred Ellipse */}
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 bottom-[4%] -translate-x-1/2 w-[42vw] h-[9vw] pointer-events-none rounded-[50%]"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgb(var(--accent-rgb) / 0.35) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                  }}
                />

                {/* Soft Contact Shadow */}
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
                  alt="STRIDE Kinetic Performance Sneaker"
                  width={950}
                  height={620}
                  loading="lazy"
                  sizes="(max-width: 1024px) 80vw, (max-width: 1440px) 42vw, 580px"
                  className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl transform -rotate-12 scale-105"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Under the Panel: Slim Email Capture Row */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 flex flex-col items-center justify-center max-w-lg mx-auto text-center"
      >
        <form onSubmit={handleSubscribe} className="w-full">
          <div className="relative flex items-center bg-[#182125]/90 border border-[var(--glass-border)] focus-within:border-[var(--accent)] rounded-full p-1.5 shadow-xl transition-all duration-300">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Get 10% off your first order"
              aria-label="Email address for discount"
              aria-describedby="cta-feedback"
              className="bg-transparent px-4 sm:px-5 py-2.5 text-sm sm:text-base text-white placeholder:text-muted focus:outline-none flex-1 font-body"
            />
            <button
              type="submit"
              className="bg-[var(--accent)] text-[var(--accent-ink)] font-bold text-xs uppercase tracking-wider px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:brightness-110 active:scale-95 transition-all cursor-pointer shrink-0 shadow-sm focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              Claim 10%
            </button>
          </div>
        </form>

        {/* Inline Feedback States */}
        <div id="cta-feedback" aria-live="polite">
          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-[var(--accent)] mt-3 font-medium justify-center"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>You&apos;re in. Check your inbox.</span>
            </motion.p>
          )}

          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-sm text-red-400 mt-3 font-medium justify-center"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </motion.p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
