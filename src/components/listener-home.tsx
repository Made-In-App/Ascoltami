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
import { formatEur, LISTENER_PAYOUT_EUR } from "@/lib/pricing";

export function ListenerHome() {
  const router = useRouter();
  const [session, setSession] = useState<UserSession | null>(null);
  const [incoming, setIncoming] = useState(false);

  useEffect(() => {
    const s = readSession();
    if (!s || s.role !== "listener") {
      router.replace("/eta?next=/registrati");
      return;
    }
    if (!s.listener?.completed) {
      router.replace("/ascoltatore/onboarding");
      return;
    }
    if (!s.listener.quizPassed) {
      router.replace("/ascoltatore/formazione");
      return;
    }
    setSession(s);
  }, [router]);

  useEffect(() => {
    if (!session?.listener?.available) {
      setIncoming(false);
      return;
    }
    const t = window.setTimeout(() => setIncoming(true), 4000);
    return () => window.clearTimeout(t);
  }, [session?.listener?.available]);

  function toggleAvailable() {
    const s = readSession();
    if (!s?.listener) return;
    const next = {
      ...s,
      listener: { ...s.listener, available: !s.listener.available },
    };
    writeSession(next);
    setSession(next);
  }

  if (!session?.listener) {
    return <p className="text-muted-foreground">Caricamento…</p>;
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
          Area ascoltatore
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
          Ciao, {session.nickname}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Orario live consigliato 18:00–23:00 · payout{" "}
          {formatEur(LISTENER_PAYOUT_EUR)} / sessione
        </p>
      </div>

      <button
        type="button"
        onClick={toggleAvailable}
        className={`inline-flex h-14 items-center gap-3 rounded-2xl px-6 font-semibold transition ${
          session.listener.available
            ? "bg-tide text-foam"
            : "bg-ink/10 text-ink"
        }`}
      >
        <span
          className={`size-2.5 rounded-full ${
            session.listener.available
              ? "animate-soft-pulse bg-signal"
              : "bg-ink/30"
          }`}
        />
        {session.listener.available ? "Disponibile" : "Non disponibile"}
      </button>

      {incoming ? (
        <div className="rounded-2xl border border-tide/30 bg-tide/10 p-5 text-left">
          <p className="font-semibold">Match in arrivo</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Speaker in coda — accetta entro 60s (placeholder MVP).
          </p>
          <div className="mt-4 flex gap-3">
            <Link
              href={`/ascoltatore/chiamata/call-${Date.now().toString(36)}`}
              className="rounded-2xl bg-signal px-4 py-2.5 text-sm font-semibold text-ink"
            >
              Accetta
            </Link>
            <button
              type="button"
              onClick={() => setIncoming(false)}
              className="rounded-2xl border border-ink/15 px-4 py-2.5 text-sm font-semibold"
            >
              Rifiuta
            </button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          {session.listener.available
            ? "In attesa di match…"
            : "Attiva la disponibilità per ricevere match."}
        </p>
      )}

      <div className="flex flex-wrap gap-4 text-sm">
        <Link
          href="/ascoltatore/guadagni"
          className="font-semibold text-tide underline"
        >
          Guadagni
        </Link>
        <Link
          href="/ascoltatore/payout-dati"
          className="font-semibold text-tide underline"
        >
          Dati fiscali
        </Link>
        <Link
          href="/ascoltatore/profilo"
          className="font-semibold text-tide underline"
        >
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
