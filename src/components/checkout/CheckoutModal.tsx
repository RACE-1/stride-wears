'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Truck,
  CreditCard,
  Phone,
  MapPin,
  User,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

type PaymentMethod = 'momo' | 'telecel' | 'card' | 'cod';

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, items, subtotal, clearCart } = useCart();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Accra');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Shipping cost: FREE over GH₵ 2,000, else GH₵ 35
  const shippingFee = subtotal >= 2000 || subtotal === 0 ? 0 : 35;
  const orderTotal = subtotal + shippingFee;

  useEffect(() => {
    if (isCheckoutOpen) {
      document.body.style.overflow = 'hidden';
      setOrderConfirmed(false);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `STR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      clearCart();
    }, 1200);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!isSubmitting) closeCheckout();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#121A1D] border border-white/15 p-6 sm:p-8 flex flex-col z-10 shadow-2xl overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">STRIDE Express Checkout</h2>
                <p className="text-xs text-white/50">Official Ghana Dispatch & Secure Escrow</p>
              </div>
            </div>

            <button
              type="button"
              onClick={closeCheckout}
              disabled={isSubmitting}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {!orderConfirmed ? (
            <form onSubmit={handleSubmitOrder} className="py-6 space-y-6">
              {/* Items summary pill preview */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-white/70">
                  <span>ORDER SUMMARY ({items.length} {items.length === 1 ? 'ITEM' : 'ITEMS'})</span>
                  <span className="text-[#00E5FF]">GH₵ {orderTotal.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                  {items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center gap-2 bg-[#172328] px-2.5 py-1.5 rounded-xl border border-white/10 shrink-0 text-xs text-white/80"
                    >
                      <span className="font-semibold">{it.product.name}</span>
                      <span className="text-white/40">×{it.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <span>1. Delivery Destination</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Kwame Mensah"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00E5FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-1">
                      Phone Number (for MoMo/Updates) *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="024 123 4567"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00E5FF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-1">
                      City / Region *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#141E22] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00E5FF] cursor-pointer"
                    >
                      <option value="Accra">Greater Accra (Same Day / Next Day)</option>
                      <option value="Kumasi">Kumasi, Ashanti Region (1-2 Days)</option>
                      <option value="Takoradi">Takoradi, Western Region</option>
                      <option value="Tamale">Tamale, Northern Region</option>
                      <option value="Cape Coast">Cape Coast, Central Region</option>
                      <option value="Sunyani">Sunyani, Bono Region</option>
                      <option value="Ho">Ho, Volta Region</option>
                      <option value="Koforidua">Koforidua, Eastern Region</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-white/70 block mb-1">
                      Street Address or Digital Post Code *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="e.g. GA-183-9024, East Legon"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#00E5FF]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#00E5FF] flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>2. Payment Option</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'momo', label: 'MTN MoMo', badge: 'Fastest' },
                    { id: 'telecel', label: 'Telecel Cash', badge: 'Instant' },
                    { id: 'card', label: 'Debit / Visa', badge: 'Secure' },
                    { id: 'cod', label: 'Cash on Delivery', badge: 'Accra Only' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as PaymentMethod)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        paymentMethod === p.id
                          ? 'border-[#00E5FF] bg-[#00E5FF]/10 text-white shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/25 hover:text-white'
                      }`}
                    >
                      <span className="block font-bold text-xs">{p.label}</span>
                      <span className="text-[10px] text-[#00E5FF]">{p.badge}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="p-4 rounded-2xl bg-[#172328] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-white/60">
                  <span>Cart Subtotal</span>
                  <span className="text-white font-mono font-bold">
                    GH₵ {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Courier Delivery ({city})</span>
                  <span className="font-mono font-bold text-[#8EF03A]">
                    {shippingFee === 0 ? 'FREE (Threshold Met)' : `GH₵ ${shippingFee}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-black text-white">
                  <span>Total Amount Due</span>
                  <span className="text-[#00E5FF] font-mono text-base">
                    GH₵ {orderTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#8EF03A] text-black font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_6px_25px_rgba(0,229,255,0.35)] hover:opacity-95 transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Payment Prompt...</span>
                ) : (
                  <>
                    <span>Place Order • GH₵ {orderTotal.toLocaleString()}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Order Confirmed Screen */
            <div className="py-12 text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(52,211,153,0.3)] animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider">
                  Order Confirmed
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-3">
                  Thank You, {fullName || 'Runner'}!
                </h3>
                <p className="text-sm text-white/60 mt-1 max-w-md mx-auto">
                  Your reference ID is <span className="text-[#00E5FF] font-mono font-bold">{orderId}</span>. A dispatch confirmation has been dispatched to {phone}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs text-white/70 text-left space-y-2">
                <div className="flex justify-between">
                  <span>Destination:</span>
                  <span className="font-semibold text-white">{address}, {city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Channel:</span>
                  <span className="font-semibold text-[#00E5FF] uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Delivery:</span>
                  <span className="font-semibold text-emerald-400">1-2 Business Days</span>
                </div>
              </div>

              <button
                type="button"
                onClick={closeCheckout}
                className="px-8 py-3.5 rounded-full bg-[#00E5FF] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#00E5FF]/90 transition-all cursor-pointer shadow-lg"
              >
                Back to STRIDE Store
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
