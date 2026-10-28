'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'motion/react';
import { SlideColorway } from '@/lib/data';

interface HeroShoeProps {
  currentSlide: SlideColorway;
  priority?: boolean;
}

export default function HeroShoe({ currentSlide, priority = true }: HeroShoeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);

  // Mouse tilt motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 140 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D transform (rotateX/rotateY up to 6deg, translate up to 14px)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  useEffect(() => {
    const checkViewport = () => setIsDesktop(window.innerWidth >= 1024);
    checkViewport();
    window.addEventListener('resize', checkViewport);

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion || window.innerWidth < 1024) return;
      const { innerWidth, innerHeight } = window;
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', checkViewport);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  return (
    <>
      {/* GHOST WATERMARK TEXT (behind shoe, z-index below shoe) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0 select-none hidden lg:block"
      >
        {/* Row 1: "STRIDE" (top ~20%, left ~42%, tracking 0.2em, Noto Sans 800) */}
        <span
          className="ghost-text absolute left-[40%] top-[18vh] font-body font-extrabold text-[13vw] xl:text-[11vw] leading-none tracking-[0.2em] uppercase opacity-90 whitespace-nowrap"
        >
          STRIDE
        </span>

        {/* Row 2: "RUN" (top ~58%, partly hidden by shoe, same size) */}
        <span
          className="ghost-text absolute left-[46%] top-[56vh] font-body font-extrabold text-[13vw] xl:text-[11vw] leading-none tracking-[0.2em] uppercase opacity-75 whitespace-nowrap"
        >
          RUN
        </span>
      </div>

      {/* FLOATING & TILT SHOE CONTAINER */}
      <motion.div
        data-component="HeroShoe"
        style={
          isDesktop && !prefersReducedMotion
            ? {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformPerspective: 1200,
              }
            : undefined
        }
        className="relative z-10 w-[82vw] sm:w-[68vw] lg:w-[44vw] lg:max-w-[560px] xl:max-w-[660px] mx-auto lg:mx-0 lg:absolute lg:left-[42%] xl:left-[44%] lg:top-[10%] xl:top-[8%] flex items-center justify-center pointer-events-none select-none my-8 lg:my-0"
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
          {/* Elliptical glow: blurred in var(--accent) at 35% opacity */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 bottom-[2%] -translate-x-1/2 w-[42vw] lg:w-[32vw] h-[8vw] pointer-events-none rounded-[50%] transition-colors duration-700"
            style={{
              background:
                'radial-gradient(ellipse at center, rgb(var(--accent-rgb) / 0.35) 0%, transparent 70%)',
              filter: 'blur(55px)',
            }}
          />

          {/* Soft dark contact shadow below sole */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 bottom-[4%] -translate-x-1/2 w-[36vw] lg:w-[26vw] h-[5vw] pointer-events-none rounded-[50%]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.65) 0%, transparent 70%)',
              filter: 'blur(18px)',
            }}
          />

          {/* Animated shoe slide transitions */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={currentSlide.id}
              initial={{ x: 120, y: -80, rotate: 6, opacity: 0 }}
              animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              exit={{ x: -120, y: 90, rotate: -8, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 180,
                damping: 22,
                mass: 0.9,
              }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={currentSlide.shoeImage}
                alt={currentSlide.name}
                width={1000}
                height={650}
                priority={priority}
                sizes="(max-width: 768px) 82vw, (max-width: 1280px) 44vw, 660px"
                className="w-full h-auto object-contain select-none pointer-events-none drop-shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}
