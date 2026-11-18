"use client";

import Link from "next/link";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { readSession, writeSession } from "@/lib/auth-store";

export default function PayoutDataPage() {
  const [saved, setSaved] = useState(false);

  function save(e: React.FormEvent) {
    e.preventDefault();
    const s = readSession();
    if (s?.listener) {
      writeSession({
        ...s,
        listener: { ...s.listener, fiscalReady: true },
      });
    }
    setSaved(true);
  }

  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Dati per i pagamenti
      </h1>
      <p className="mt-3 text-muted-foreground">
        Li chiediamo prima del primo pagamento o quando il saldo raggiunge €50.
      </p>
      <form onSubmit={save} className="mt-8 space-y-4">
        <input
          required
          placeholder="Nome e cognome"
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
        />
        <input
          required
          placeholder="Codice fiscale"
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
        />
        <input
          placeholder="IBAN"
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
        />
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-signal px-5 font-semibold text-ink"
        >
          Salva
        </button>
      </form>
      {saved ? (
        <p className="mt-4 text-sm font-medium text-tide">Salvato in locale.</p>
      ) : null}
      <Link
        href="/ascoltatore/home"
        className="mt-8 inline-flex font-semibold underline"
      >
        Home
      </Link>
    </PageShell>
  );
}
