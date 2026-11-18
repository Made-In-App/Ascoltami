"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { readSession } from "@/lib/auth-store";

export default function WalletPage() {
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    setTokens(readSession()?.tokens ?? 0);
  }, []);

  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Wallet
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Token residui: <span className="font-semibold text-ink">{tokens}</span>
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        La chiamata €5 non accredita token: è one-shot. Storico acquisti completo
        arriverà col backend.
      </p>
      <Link
        href="/ascolto/home"
        className="mt-8 inline-flex font-semibold text-tide underline"
      >
        Torna alla home
      </Link>
    </PageShell>
  );
}
