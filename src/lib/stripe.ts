import type { NextRequest } from "next/server";
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

/**
 * Mock unlock is only for local development when Stripe is absent.
 * Never available in production — fail closed instead.
 */
export function allowMockCheckout(): boolean {
  return process.env.NODE_ENV !== "production" && !stripeConfigured();
}

/**
 * Base URL for Stripe success/cancel redirects.
 * Prefer APP_BASE_URL; never trust x-forwarded-* from the client.
 */
export function appBaseUrl(req: NextRequest): string {
  const configured = process.env.APP_BASE_URL?.trim();
  if (configured) {
    return configured.replace(/\/$/, "");
  }
  return req.nextUrl.origin;
}
