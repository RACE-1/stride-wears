'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Mail, Check, ShieldCheck, CreditCard } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Logo from '@/components/ui/Logo';
import { brand } from '@/lib/brand';

interface FooterLink {
  label: string;
  href: string;
}

const shopLinks: FooterLink[] = [
  { label: 'Featured Footwear', href: '/#featured-shoes' },
  { label: 'Men Performance', href: '/#catalog?gender=Men' },
  { label: 'Women Performance', href: '/#catalog?gender=Women' },
  { label: 'Kids & Junior', href: '/#catalog?gender=Kids' },
  { label: 'Apparel & Tops', href: '/#catalog?category=Apparel' },
  { label: 'Bags & Packs', href: '/#catalog?category=Bags' },
];

const companyLinks: FooterLink[] = [
  { label: 'About STRIDE', href: '/#about' },
  { label: 'Kinetic Lab Tech', href: '/#technology' },
  { label: 'Athlete Roster', href: '/#athletes' },
  { label: 'Sustainability & Circularity', href: '/#sustainability' },
  { label: 'Store Admin Portal', href: '/admin' },
  { label: 'Careers', href: '/#careers' },
];

const helpLinks: FooterLink[] = [
  { label: 'Ghana Shipping & Delivery', href: '/#shipping' },
  { label: '30-Day Returns Policy', href: '/#returns' },
  { label: 'Footwear Sizing Matrix', href: '/#sizing' },
  { label: 'Order Tracking', href: '/#track' },
  { label: 'Contact Support', href: '/#contact' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { name: 'X / Twitter', href: 'https://x.com', icon: FaXTwitter },
  { name: 'TikTok', href: 'https://tiktok.com', icon: FaTiktok },
  { name: 'YouTube', href: 'https://youtube.com', icon: FaYoutube },
  { name: 'Facebook', href: 'https://facebook.com', icon: FaFacebookF },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer
      id="footer"
      className="relative w-full bg-[#0B1012] border-t border-white/10 text-white/70 overflow-hidden"
    >
      {/* Newsletter Strip */}
      <div className="border-b border-white/10 bg-[#10171A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left max-w-xl">
              <span className="text-[#00E5FF] text-xs font-bold tracking-widest uppercase block mb-1">
                Stay Ahead Of The Pack
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Get 10% off your first order & priority drop access
              </h3>
              <p className="text-xs sm:text-sm text-white/50 mt-1">
                Be the first to know about new marathon racing drops, limited colorways, and athlete gear tests.
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#00E5FF] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#00E5FF] text-black font-bold text-sm tracking-wide hover:bg-[#00E5FF]/90 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-[0_4px_16px_rgba(0,229,255,0.25)]"
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Brand Col (2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <Logo />
            <p className="mt-4 mb-6 text-sm text-white/60 leading-relaxed max-w-sm">
              STRIDE is a high-performance athletic footwear and sportswear engineering house. Designed for marathoners, track athletes, and uncompromising movers.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#00E5FF] hover:border-[#00E5FF] hover:text-black hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] mb-4">
              Shop Collections
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] mb-4">
              STRIDE House
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] mb-4">
              Customer Support
            </h4>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Accepted Payment Methods */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-3 text-xs text-white/50 text-center sm:text-left">
            <span className="font-semibold text-white/70">Secure Payment Options:</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-mono text-[11px] font-bold">
                MTN MoMo
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-mono text-[11px] font-bold">
                Telecel Cash
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-mono text-[11px] font-bold">
                Visa
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-mono text-[11px] font-bold">
                Mastercard
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-mono text-[11px] font-bold">
                Apple Pay
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white font-mono text-[11px] font-bold">
                PayPal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>

      {/* Ghost Wordmark */}
      <div className="relative w-full overflow-hidden flex justify-center items-center py-4 -mb-4 sm:-mb-6 md:-mb-10 select-none pointer-events-none">
        <span className="ghost-text font-black text-[20vw] leading-none tracking-tight block uppercase opacity-10 whitespace-nowrap">
          {brand.name}
        </span>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="relative z-10 border-t border-white/10 bg-[#070A0B]/90 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>&copy; 2026 {brand.name} Inc. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link href="/#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link href="/#terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <span>•</span>
            <Link href="/#cookies" className="hover:text-white transition-colors">Cookie Preferences</Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-[#00E5FF] hover:border-[#00E5FF] hover:text-black flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
