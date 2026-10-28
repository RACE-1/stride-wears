'use client';

import React from 'react';
import { motion } from 'motion/react';
import { brand } from '@/lib/brand';
import AccentButton from '@/components/ui/AccentButton';
import { FaFacebookF, FaAmazon, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function HeroCopy() {
  const socialItems = [
    { name: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
    { name: 'Amazon', href: 'https://amazon.com', icon: FaAmazon },
    { name: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
    { name: 'X', href: 'https://x.com', icon: FaXTwitter },
  ];

  return (
    <div
      data-component="HeroCopy"
      className="relative z-20 flex flex-col items-start w-full lg:w-auto lg:absolute lg:left-0 lg:top-[16vh] xl:top-[18vh] pointer-events-auto"
    >
      {/* Headline line 1: "Born" in var(--accent) */}
      <motion.div
        initial={{ y: 35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="font-body font-light text-[var(--accent)] text-[14vw] sm:text-[10vw] lg:text-[clamp(52px,5.5vw,96px)] leading-none block select-none">
          {brand.headlineLight}
        </span>
      </motion.div>

      {/* Headline line 2: "TO RUN" in white, tight beneath line 1 */}
      <motion.div
        initial={{ y: 35, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="-mt-1 lg:-mt-2"
      >
        <span className="font-display font-bold text-white text-[19vw] sm:text-[14vw] lg:text-[clamp(68px,8.5vw,144px)] leading-[0.9] tracking-[-0.02em] block select-none">
          {brand.headlineBold}
        </span>
      </motion.div>

      {/* Tagline Paragraph */}
      <motion.p
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="font-body font-normal text-white/90 text-[15px] sm:text-[16px] lg:text-[clamp(15px,1.15vw,18px)] leading-[1.65] max-w-full sm:max-w-md lg:max-w-[400px] xl:max-w-[440px] mt-5 lg:mt-6"
      >
        {brand.tagline}
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-7 lg:mt-9 w-full sm:w-auto"
      >
        <AccentButton
          variant="outline"
          className="w-full sm:w-[clamp(160px,16vw,200px)] h-[54px] text-[16px] sm:text-[17px]"
        >
          Order Now
        </AccentButton>
      </motion.div>

      {/* Social Icons Row: desktop anchored to bottom-left; mobile in-flow */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8 lg:mt-0 lg:absolute lg:left-0 lg:top-[66vh] xl:top-[68vh] flex items-center gap-5 sm:gap-6 z-20"
        aria-label="Brand Social Links"
      >
        {socialItems.map((social, i) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 + i * 0.08, duration: 0.5 }}
              className="text-white/80 hover:text-[var(--accent)] hover:-translate-y-[2px] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--accent)] rounded-full p-1"
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
