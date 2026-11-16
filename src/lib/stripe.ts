import Stripe from "stripe";
import { site } from "@/lib/site";

export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key);
}

export function checkoutAmountCents(): number {
  return Math.round(site.priceEuro * 100);
}
