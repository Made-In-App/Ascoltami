"use client";

import { useState } from "react";
import { CreditCard, LoaderCircle } from "lucide-react";
import { priceLabel } from "@/lib/site";
import { cn } from "@/lib/utils";

type PayButtonProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function PayButton({ className, tone = "dark" }: PayButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const classes = cn(
    "group inline-flex h-14 items-center gap-3 rounded-2xl px-6 text-[0.95rem] font-semibold tracking-tight transition-all duration-300 disabled:cursor-wait disabled:opacity-80",
    tone === "dark"
      ? "bg-signal text-ink shadow-[0_18px_40px_-18px_oklch(0.75_0.16_115/0.8)] hover:-translate-y-0.5 hover:brightness-105"
      : "bg-foam text-ink shadow-[0_18px_40px_-18px_oklch(1_0_0/0.45)] hover:-translate-y-0.5 hover:bg-white",
    className
  );

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Impossibile avviare il pagamento");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Connessione non riuscita. Riprova.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button type="button" onClick={startCheckout} disabled={loading} className={classes}>
        <span className="relative flex size-8 items-center justify-center rounded-xl bg-ink/10">
          {loading ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
          ) : (
            <CreditCard className="size-4" aria-hidden />
          )}
        </span>
        {loading ? "Reindirizzamento…" : `Sblocca il numero · ${priceLabel()}`}
      </button>
      {error ? <p className="text-sm text-red-200/90">{error}</p> : null}
    </div>
  );
}
