"use client";

import Link from "next/link";
import { useState } from "react";
import { formatEur } from "@/lib/pricing";

type PostCallProps = {
  callId: string;
  role: "speaker" | "listener";
};

export function PostCall({ callId, role }: PostCallProps) {
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
          Dopo la chiamata
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
          Come è andata?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">Sessione {callId}</p>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            className={`size-11 rounded-xl text-lg font-semibold ${
              rating >= n ? "bg-signal text-ink" : "bg-foam border border-ink/10"
            }`}
            aria-label={`${n} stelle`}
          >
            ★
          </button>
        ))}
      </div>

      {!sent ? (
        <button
          type="button"
          onClick={() => setSent(true)}
          className="inline-flex h-14 items-center justify-center rounded-2xl bg-ink px-6 font-semibold text-foam"
        >
          Invia feedback
        </button>
      ) : (
        <p className="text-sm font-medium text-tide">Grazie per il feedback.</p>
      )}

      {role === "speaker" ? (
        <div className="border-t border-ink/10 pt-8">
          <p className="font-semibold">Continua ad ascoltarti</p>
          <p className="mt-2 text-muted-foreground">
            Pack 5 a {formatEur(22)} · {formatEur(4.4)} a sessione
          </p>
          <Link
            href="/ascolto/checkout?sku=pack5"
            className="mt-4 inline-flex h-12 items-center justify-center rounded-2xl bg-signal px-5 font-semibold text-ink"
          >
            Pack 5
          </Link>
          <Link
            href="/ascolto/home"
            className="ml-3 text-sm font-semibold text-muted-foreground underline"
          >
            Non ora
          </Link>
        </div>
      ) : (
        <Link
          href="/ascoltatore/guadagni"
          className="inline-flex font-semibold text-tide underline"
        >
          Vedi guadagni (+{formatEur(3.5)} se policy OK)
        </Link>
      )}
    </div>
  );
}
