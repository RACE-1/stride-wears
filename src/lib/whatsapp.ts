/**
 * WhatsApp click-to-chat utility for STRIDE.
 *
 * Uses the official wa.me deep-link which opens the native WhatsApp app
 * on mobile devices and WhatsApp Web on desktop browsers — no API
 * credentials required.
 */

/** Ghana country code + local number (drop leading 0). */
export const WHATSAPP_NUMBER = '233546177460';

/**
 * Build a wa.me click-to-chat URL with an optional pre-filled message.
 * The message is URI-encoded so special characters are safe.
 */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Default message sent from the floating site-wide button. */
export const WHATSAPP_GENERAL_MESSAGE =
  "Hello, I visited your website and I'm interested in your products. Please can you assist me?";

/** Message template for product inquiry — the product name is injected. */
export function productInquiryMessage(productName: string): string {
  return `Hello, I'm interested in *${productName}*. Please provide more information.`;
}
