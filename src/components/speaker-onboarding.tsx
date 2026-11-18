"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readSession, writeSession } from "@/lib/auth-store";

const MOTIVES = [
  "Scuola/studio",
  "Relazioni",
  "Ansia quotidiana",
  "Solitudine",
  "Famiglia",
  "Altro",
];

const TAGS = ["ascolto silenzioso", "voglio feedback", "solo sfogo"];

export function SpeakerOnboarding() {
  const router = useRouter();
  const [motives, setMotives] = useState<string[]>([]);
  const [helpToday, setHelpToday] = useState("");
  const [listenerGender, setListenerGender] = useState("indifferente");
  const [timeBand, setTimeBand] = useState("sera");
  const [softTags, setSoftTags] = useState<string[]>([]);
  const [displayMode, setDisplayMode] = useState<"nickname" | "name">(
    "nickname"
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const s = readSession();
    if (!s || s.role !== "speaker") {
      router.replace("/eta?next=/registrati");
      return;
    }
    if (s.speaker?.completed) {
      router.replace("/ascolto/home");
      return;
    }
    setReady(true);
  }, [router]);

  function toggle(list: string[], value: string, setter: (v: string[]) => void) {
    setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const s = readSession();
    if (!s) return;
    writeSession({
      ...s,
      speaker: {
        motives,
        helpToday,
        listenerGender,
        timeBand,
        softTags,
        displayMode,
        completed: true,
      },
    });
    router.push("/ascolto/home");
  }

  if (!ready) {
    return <p className="text-muted-foreground">Caricamento profilo…</p>;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">1/3 · Perché sei qui</h2>
        <p className="text-sm text-muted-foreground">Categorie non cliniche.</p>
        <div className="flex flex-wrap gap-2">
          {MOTIVES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => toggle(motives, m, setMotives)}
              className={`rounded-xl px-3 py-2 text-sm transition ${
                motives.includes(m)
                  ? "bg-tide text-foam"
                  : "bg-foam border border-ink/10 text-ink/70"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
        <label className="block space-y-2">
          <span className="text-sm font-medium">Cosa ti aiuterebbe oggi?</span>
          <textarea
            value={helpToday}
            onChange={(e) => setHelpToday(e.target.value)}
            rows={3}
            className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3 outline-none ring-tide/30 focus:ring-2"
          />
        </label>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">2/3 · Preferenze match</h2>
        <label className="block space-y-2 text-sm">
          Genere ascoltatore
          <select
            value={listenerGender}
            onChange={(e) => setListenerGender(e.target.value)}
            className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
          >
            <option value="indifferente">Indifferente</option>
            <option value="donna">Donna</option>
            <option value="uomo">Uomo</option>
            <option value="non-binario">Non binario</option>
          </select>
        </label>
        <label className="block space-y-2 text-sm">
          Fascia oraria tipica
          <select
            value={timeBand}
            onChange={(e) => setTimeBand(e.target.value)}
            className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3"
          >
            <option value="mattina">Mattina</option>
            <option value="pomeriggio">Pomeriggio</option>
            <option value="sera">Sera (peak 18–23)</option>
          </select>
        </label>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggle(softTags, t, setSoftTags)}
              className={`rounded-xl px-3 py-2 text-sm transition ${
                softTags.includes(t)
                  ? "bg-signal text-ink"
                  : "bg-foam border border-ink/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">3/3 · Comfort</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {(
            [
              ["nickname", "Nickname"],
              ["name", "Nome"],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm ${
                displayMode === value
                  ? "border-tide bg-tide/10"
                  : "border-ink/10 bg-foam"
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                checked={displayMode === value}
                onChange={() => setDisplayMode(value)}
              />
              {label}
            </label>
          ))}
        </div>
        <p className="rounded-2xl border border-ink/8 bg-mist/60 px-4 py-3 text-sm text-muted-foreground">
          Canale fisso: audio in Ascoltami. Video e numeri esterni non
          disponibili.
        </p>
      </section>

      <button
        type="submit"
        className="inline-flex h-14 items-center justify-center rounded-2xl bg-signal px-6 font-semibold text-ink"
      >
        Completa profilo
      </button>
    </form>
  );
}
