'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    totalItems,
    openCheckout,
  } = useCart();

  // Free shipping threshold: GH₵ 2,000
  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
            aria-hidden="true"
          />

          {/* Slide-over Drawer */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping Cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 w-full max-w-[440px] bg-[#11191C] border-l border-white/10 shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white uppercase tracking-wider">
                    Your Cart
                  </h3>
                  <span className="text-xs text-white/60">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-2 focus-visible:outline-[#00E5FF]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="px-6 py-3.5 bg-[#182125]/90 border-b border-white/5">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-white/80 font-medium">
                  <Truck className="w-3.5 h-3.5 text-[#00E5FF]" />
                  {amountToFreeShipping === 0 ? (
                    <span className="text-[#00E5FF] font-bold">You qualify for FREE Delivery across Ghana!</span>
                  ) : (
                    <span>Add <strong className="text-white">GH₵ {amountToFreeShipping.toLocaleString()}</strong> for Free Delivery</span>
                  )}
                </span>
                <span className="text-[#00E5FF] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#00E5FF] to-[#2BB3FF] rounded-full shadow-[0_0_10px_#00E5FF]"
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-white/5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 mb-4">
                    <ShoppingBag className="w-9 h-9" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1.5 font-display">
                    Your cart is currently empty
                  </h4>
                  <p className="text-sm text-white/60 max-w-[260px] mb-6">
                    Discover our high-performance running shoes and apparel collection.
                  </p>
                  <button
                    type="button"
                    onClick={closeCart}
                    className="px-6 py-3 rounded-full bg-[#00E5FF] text-[#0E1A0B] font-bold text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-xl bg-black/40 border border-white/10 shrink-0 overflow-hidden flex items-center justify-center p-1.5 relative">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={90}
                        height={90}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${item.product.slug}`}
                        onClick={closeCart}
                        className="font-medium text-white text-[15px] hover:text-[#00E5FF] transition-colors line-clamp-1 block leading-snug"
                      >
                        {item.product.name}
                      </Link>

                      <div className="flex items-center gap-2 mt-1 text-xs text-white/60">
                        <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                          {item.size}
                        </span>
                        <span>•</span>
                        <span className="truncate">{item.color}</span>
                      </div>

                      {/* Price & Quantity stepper */}
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-display font-bold text-white text-[15px]">
                          GH₵ {(item.product.price * item.quantity).toLocaleString()}
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center rounded-lg border border-white/15 bg-white/5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                            className="w-7 h-7 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0E1517] space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex items-center justify-between text-white/70">
                    <span>Subtotal</span>
                    <span className="font-bold text-white text-base font-display">
                      GH₵ {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>Estimated Shipping</span>
                    <span>{amountToFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openCheckout}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#2BB3FF] text-[#0A1014] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,229,255,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-white/50 border-t border-white/5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00E5FF]" />
                  <span>Secure Checkout • MTN MoMo / Cards / Cash</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
