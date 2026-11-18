"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readSession } from "@/lib/auth-store";

type Proposal = {
  id: string;
  name: string;
  overlap: string;
  rating: string;
};

const MOCK: Proposal[] = [
  {
    id: "l1",
    name: "Marta · peer",
    overlap: "solitudine · sera",
    rating: "4.8",
  },
  {
    id: "l2",
    name: "Luca · peer",
    overlap: "studio · ascolto silenzioso",
    rating: "4.6",
  },
  {
    id: "l3",
    name: "Giulia · peer",
    overlap: "relazioni · feedback",
    rating: "4.9",
  },
];

export function MatchWaiting() {
  const router = useRouter();
  const [phase, setPhase] = useState<"search" | "best" | "alternatives" | "queue">(
    "search"
  );
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const s = readSession();
    if (!s || s.role !== "speaker") {
      router.replace("/eta?next=/registrati");
      return;
    }
  }, [router]);

  useEffect(() => {
    const tick = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    const show = window.setTimeout(() => setPhase("best"), 2800);
    return () => {
      window.clearInterval(tick);
      window.clearTimeout(show);
    };
  }, []);

  function accept(id: string) {
    const callId = `call-${Date.now().toString(36)}`;
    router.push(`/ascolto/chiamata/${callId}?listener=${id}`);
  }

  const title =
    phase === "search"
      ? "Cerchiamo un ascoltatore…"
      : phase === "best"
        ? "Ascoltatore trovato"
        : phase === "alternatives"
          ? "Proposte disponibili"
          : "Coda / prenota slot";

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
          Matching
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
          {title}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Di solito meno di 90 secondi in orario live (18:00–23:00).
        </p>
        <p className="mt-2 text-sm text-ink/50">Attesa: {elapsed}s</p>
      </div>

      {phase === "search" ? (
        <div className="flex items-center gap-3">
          <span className="size-3 animate-soft-pulse rounded-full bg-signal" />
          <span className="size-3 animate-soft-pulse rounded-full bg-tide [animation-delay:0.3s]" />
          <span className="size-3 animate-soft-pulse rounded-full bg-signal [animation-delay:0.6s]" />
        </div>
      ) : null}

      {phase === "best" ? (
        <div className="space-y-5">
          <div>
            <p className="font-semibold text-ink">{MOCK[0].name}</p>
            <p className="text-sm text-muted-foreground">
              {MOCK[0].overlap} · ★ {MOCK[0].rating}
            </p>
          </div>
          <button
            type="button"
            onClick={() => accept("best")}
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-signal px-6 font-semibold text-ink"
          >
            Accetta il migliore
          </button>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setPhase("alternatives")}
              className="text-sm font-semibold text-tide underline"
            >
              Vedi alternative
            </button>
            <button
              type="button"
              onClick={() => setPhase("queue")}
              className="text-sm font-semibold text-muted-foreground underline"
            >
              Nessuno disponibile? Vai in coda
            </button>
          </div>
        </div>
      ) : null}

      {phase === "alternatives" ? (
        <ul className="space-y-4">
          {MOCK.map((p) => (
            <li
              key={p.id}
              className="flex flex-col gap-3 border-b border-ink/10 py-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-semibold text-ink">{p.name}</p>
                <p className="text-sm text-muted-foreground">
                  {p.overlap} · ★ {p.rating}
                </p>
              </div>
              <button
                type="button"
                onClick={() => accept(p.id)}
                className="inline-flex h-12 items-center justify-center rounded-2xl bg-signal px-5 font-semibold text-ink"
              >
                Accetta
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => setPhase("best")}
              className="text-sm font-semibold text-tide underline"
            >
              Torna ad Accetta il migliore
            </button>
          </li>
        </ul>
      ) : null}

      {phase === "queue" ? (
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Nessun ascoltatore online al momento. Resta in coda o prenota uno
            slot serale. Il contatto resta solo in Ascoltami.
          </p>
          <Link
            href="/ascolto/home"
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-ink/15 px-5 font-semibold"
          >
            Torna alla home
          </Link>
        </div>
      ) : null}
    </div>
  );
}
