"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readSession, writeSession } from "@/lib/auth-store";

export function ListenerOnboarding() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [livedExperience, setLived] = useState("");
  const [availabilityNote, setAvail] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = readSession();
    if (!s || s.role !== "listener") {
      router.replace("/eta?next=/registrati");
      return;
    }
    if (s.listener?.completed) {
      router.replace("/ascoltatore/formazione");
      return;
    }
    setReady(true);
  }, [router]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const s = readSession();
    if (!s?.listener) return;
    writeSession({
      ...s,
      listener: {
        ...s.listener,
        bio,
        livedExperience,
        availabilityNote,
        completed: true,
      },
    });
    router.push("/ascoltatore/formazione");
  }

  if (!ready) return <p className="text-muted-foreground">Caricamento…</p>;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <label className="block space-y-2">
        <span className="text-sm font-medium">Bio breve</span>
        <textarea
          required
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">
          Esperienze di vita (auto-dichiarate, non cliniche)
        </span>
        <textarea
          rows={3}
          value={livedExperience}
          onChange={(e) => setLived(e.target.value)}
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium">Disponibilità oraria</span>
        <input
          required
          value={availabilityNote}
          onChange={(e) => setAvail(e.target.value)}
          placeholder="Es. Lun–Ven 18–23"
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
        />
      </label>
      <p className="rounded-2xl border border-ink/8 bg-mist/60 px-4 py-3 text-sm text-muted-foreground">
        Canale: solo audio WebRTC in-sito · microfono obbligatorio · cuffie
        consigliate.
      </p>
      <button
        type="submit"
        className="inline-flex h-14 items-center justify-center rounded-2xl bg-signal px-6 font-semibold text-ink"
      >
        Continua alla formazione
      </button>
    </form>
  );
}
