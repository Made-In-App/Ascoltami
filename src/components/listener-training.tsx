"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readSession, writeSession } from "@/lib/auth-store";

const MODULES = [
  "Ascolto attivo",
  "Limiti del ruolo",
  "Escalation crisi",
  "Divieto contatti off-platform",
];

export function ListenerTraining() {
  const router = useRouter();
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = readSession();
    if (!s || s.role !== "listener" || !s.listener?.completed) {
      router.replace("/ascoltatore/onboarding");
      return;
    }
    if (s.listener.quizPassed) {
      router.replace("/ascoltatore/home");
      return;
    }
    setReady(true);
  }, [router]);

  function submit() {
    setError(null);
    if (MODULES.some((m) => !done[m])) {
      setError("Completa tutti i moduli.");
      return;
    }
    if (answer.trim().toLowerCase() !== "no") {
      setError(
        'Quiz: se qualcuno chiede il tuo WhatsApp, la risposta corretta è "no".'
      );
      return;
    }
    const s = readSession();
    if (!s?.listener) return;
    writeSession({
      ...s,
      listener: {
        ...s.listener,
        trainingDone: true,
        quizPassed: true,
      },
    });
    router.push("/ascoltatore/home");
  }

  if (!ready) return <p className="text-muted-foreground">Caricamento…</p>;

  return (
    <div className="space-y-8">
      <ul className="space-y-3">
        {MODULES.map((m) => (
          <li key={m}>
            <label className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-foam px-4 py-3 text-sm">
              <input
                type="checkbox"
                checked={!!done[m]}
                onChange={(e) =>
                  setDone((d) => ({ ...d, [m]: e.target.checked }))
                }
              />
              {m}
            </label>
          </li>
        ))}
      </ul>

      <label className="block space-y-2">
        <span className="text-sm font-medium">
          Quiz: qualcuno chiede il tuo numero/WhatsApp. Cosa fai? (scrivi
          &quot;no&quot;)
        </span>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
        />
      </label>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <button
        type="button"
        onClick={submit}
        className="inline-flex h-14 items-center justify-center rounded-2xl bg-signal px-6 font-semibold text-ink"
      >
        Sblocca disponibilità
      </button>
    </div>
  );
}
