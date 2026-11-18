"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAgeVerifiedCookie } from "@/lib/auth-store";

function ageFromDob(iso: string): number {
  const dob = new Date(iso);
  if (Number.isNaN(dob.getTime())) return -1;
  const now = new Date();
  let age = now.getFullYear() - dob.getFullYear();
  const m = now.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age -= 1;
  return age;
}

type AgeGateFormProps = {
  nextPath: string;
};

export function AgeGateForm({ nextPath }: AgeGateFormProps) {
  const router = useRouter();
  const [dob, setDob] = useState("");
  const [confirm18, setConfirm18] = useState(false);
  const [tos, setTos] = useState(false);
  const [disclaimer, setDisclaimer] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const age = ageFromDob(dob);
    if (age < 0) {
      setError("Inserisci una data di nascita valida.");
      return;
    }
    if (age < 18 || !confirm18) {
      setBlocked(true);
      setAgeVerifiedCookie(false);
      return;
    }
    if (!tos || !disclaimer) {
      setError("Devi accettare Termini, Privacy e disclaimer.");
      return;
    }
    setAgeVerifiedCookie(true);
    router.push(nextPath || "/registrati");
  }

  if (blocked) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-medium text-ink">
          Non possiamo attivare un account a pagamento.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Ascoltami è riservato ai maggiorenni (18+). Puoi seguire i contenuti
          editoriali, ma non aprire sessioni a pagamento.
        </p>
        <Link href="/" className="inline-flex font-semibold text-tide underline">
          Torna alla home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <label className="block space-y-2">
        <span className="text-sm font-medium text-ink">Data di nascita</span>
        <input
          type="date"
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3 text-ink outline-none ring-tide/30 focus:ring-2"
        />
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
        <input
          type="checkbox"
          checked={confirm18}
          onChange={(e) => setConfirm18(e.target.checked)}
          className="mt-1 size-4 rounded border-ink/20"
        />
        Dichiaro di avere almeno 18 anni.
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
        <input
          type="checkbox"
          checked={tos}
          onChange={(e) => setTos(e.target.checked)}
          className="mt-1 size-4 rounded border-ink/20"
        />
        Accetto i{" "}
        <Link href="/legale/termini" className="underline">
          Termini
        </Link>{" "}
        e la{" "}
        <Link href="/legale/privacy" className="underline">
          Privacy
        </Link>
        .
      </label>

      <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/80">
        <input
          type="checkbox"
          checked={disclaimer}
          onChange={(e) => setDisclaimer(e.target.checked)}
          className="mt-1 size-4 rounded border-ink/20"
        />
        Capisco che Ascoltami non è terapia e in emergenza chiamo i servizi
        (112 / linee locali).
      </label>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <button
        type="submit"
        className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-signal px-6 text-[0.95rem] font-semibold text-ink transition hover:brightness-105 sm:w-auto"
      >
        Continua
      </button>
    </form>
  );
}
