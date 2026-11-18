"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  isAgeVerifiedFromCookie,
  readSession,
  requireAgeGatePath,
  writeSession,
  type UserSession,
} from "@/lib/auth-store";
import { formatEur, SKUS, type SkuId } from "@/lib/pricing";

type CheckoutClientProps = {
  skuId: SkuId;
};

export function CheckoutClient({ skuId }: CheckoutClientProps) {
  const router = useRouter();
  const sku = SKUS[skuId];
  const [session, setSession] = useState<UserSession | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!isAgeVerifiedFromCookie()) {
      router.replace(requireAgeGatePath(`/ascolto/checkout?sku=${skuId}`));
      return;
    }
    const s = readSession();
    if (!s || s.role !== "speaker") {
      router.replace("/eta?next=/registrati");
      return;
    }
    setSession(s);
  }, [router, skuId]);

  async function pay() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku: skuId }),
      });
      const data = (await res.json()) as {
        mode: "stripe" | "stub";
        url?: string;
        sessionId: string;
        message?: string;
      };

      if (data.mode === "stripe" && data.url) {
        window.location.href = data.url;
        return;
      }

      // Stub: accredita pack subito in locale (no webhook).
      const s = readSession();
      if (s && !sku.directCall) {
        writeSession({ ...s, tokens: s.tokens + sku.tokens });
      }

      router.push(
        `/ascolto/checkout/ok?sku=${skuId}&mode=stub&sid=${data.sessionId}`
      );
    } catch {
      setMessage("Checkout non riuscito. Riprova.");
      setBusy(false);
    }
  }

  if (!session) {
    return <p className="text-muted-foreground">Preparazione checkout…</p>;
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
          Riepilogo
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
          {sku.label}
        </h1>
        <p className="mt-2 text-3xl font-semibold">{formatEur(sku.priceEur)}</p>
        <p className="mt-3 text-muted-foreground">{sku.description}</p>
      </div>

      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>Sessione audio ≤30′ in Ascoltami</li>
        <li>Nessuna registrazione · 18+</li>
        <li>Niente video · niente numeri esterni</li>
      </ul>

      <p className="rounded-2xl border border-ink/10 bg-mist/70 px-4 py-3 text-sm text-muted-foreground">
        Se <code>STRIPE_SECRET_KEY</code> è configurato, avviamo Stripe Checkout.
        Altrimenti usiamo un pagamento stub MVP (credito locale).
      </p>

      {message ? <p className="text-sm text-destructive">{message}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          disabled={busy}
          onClick={pay}
          className="inline-flex h-14 items-center justify-center rounded-2xl bg-signal px-6 font-semibold text-ink disabled:opacity-60"
        >
          {busy ? "Attendi…" : "Paga e continua"}
        </button>
        <Link
          href="/ascolto/home"
          className="inline-flex h-14 items-center justify-center rounded-2xl border border-ink/15 px-6 font-semibold"
        >
          Annulla
        </Link>
      </div>
    </div>
  );
}
