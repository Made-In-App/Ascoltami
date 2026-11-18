"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearSession,
  readSession,
  writeSession,
  type UserSession,
} from "@/lib/auth-store";
import { formatEur, SKUS } from "@/lib/pricing";

export function SpeakerHome() {
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    const s = readSession();
    if (!s || s.role !== "speaker") {
      router.replace("/eta?next=/registrati");
      return;
    }
    if (!s.speaker?.completed) {
      router.replace("/ascolto/onboarding");
      return;
    }
    setSession(s);
  }, [router]);

  function useToken() {
    const s = readSession();
    if (!s || s.tokens < 1) return;
    writeSession({ ...s, tokens: s.tokens - 1 });
    router.push("/ascolto/match?paid=token");
  }

  if (!session) {
    return <p className="text-muted-foreground">Caricamento…</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
          Area ascolto
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
          Ciao, {session.nickname}
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Token disponibili:{" "}
          <span className="font-semibold text-ink">{session.tokens}</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/ascolto/checkout?sku=call5"
          className="inline-flex h-14 items-center justify-center rounded-2xl bg-signal px-6 font-semibold text-ink"
        >
          Chiama ora · {formatEur(SKUS.call5.priceEur)}
        </Link>
        <button
          type="button"
          disabled={session.tokens < 1}
          onClick={useToken}
          className="inline-flex h-14 items-center justify-center rounded-2xl bg-ink px-6 font-semibold text-foam disabled:opacity-40"
        >
          Usa 1 token · chiama ora
        </button>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-tide">
          Pack
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/ascolto/checkout?sku=pack5"
            className="rounded-2xl border border-ink/12 bg-foam px-5 py-4 text-sm font-medium hover:border-tide"
          >
            5 · {formatEur(22)}
          </Link>
          <Link
            href="/ascolto/checkout?sku=pack10"
            className="rounded-2xl border border-ink/12 bg-foam px-5 py-4 text-sm font-medium hover:border-tide"
          >
            10 · {formatEur(40)}
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm">
        <Link href="/ascolto/wallet" className="font-semibold text-tide underline">
          Wallet
        </Link>
        <Link href="/ascolto/profilo" className="font-semibold text-tide underline">
          Profilo
        </Link>
        <button
          type="button"
          className="text-muted-foreground underline"
          onClick={() => {
            clearSession();
            router.push("/");
          }}
        >
          Esci
        </button>
      </div>
    </div>
  );
}
