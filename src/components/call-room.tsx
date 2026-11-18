"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SESSION_MAX_MINUTES, SESSION_WARN_MINUTES } from "@/lib/pricing";

type CallRoomProps = {
  callId: string;
  role: "speaker" | "listener";
  peerLabel?: string;
};

function formatTimer(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function CallRoom({ callId, role, peerLabel }: CallRoomProps) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [livekitReady] = useState(false);
  const [micDenied, setMicDenied] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const maxSeconds = SESSION_MAX_MINUTES * 60;
  const warnAt = SESSION_WARN_MINUTES * 60;

  useEffect(() => {
    let cancelled = false;
    async function checkMic() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) return;
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        stream.getTracks().forEach((t) => t.stop());
      } catch {
        if (!cancelled) setMicDenied(true);
      }
    }
    void checkMic();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((s) => {
        if (s + 1 >= maxSeconds) {
          window.clearInterval(id);
          router.push(
            role === "speaker"
              ? `/ascolto/post/${callId}`
              : `/ascoltatore/post/${callId}`
          );
          return maxSeconds;
        }
        return s + 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [callId, maxSeconds, role, router]);

  const bars = useMemo(
    () => Array.from({ length: 16 }, (_, i) => 20 + ((i * 37) % 60)),
    []
  );

  function hangUp() {
    router.push(
      role === "speaker"
        ? `/ascolto/post/${callId}`
        : `/ascoltatore/post/${callId}`
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Ascoltami · in chiamata
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        Persona · audio · id {callId.slice(0, 10)}
      </p>

      {!livekitReady ? (
        <p className="mt-6 rounded-2xl border border-signal/40 bg-signal/15 px-4 py-3 text-sm text-ink">
          LiveKit: in arrivo. Room mock MVP — nessuna chiamata reale finché non
          configuri le chiavi LIVEKIT.
        </p>
      ) : null}

      {micDenied ? (
        <p className="mt-4 text-sm text-destructive">
          Microfono negato. Abilitalo nelle impostazioni del browser per avviare
          una room reale.
        </p>
      ) : null}

      <div className="mt-12 flex h-24 items-end justify-center gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className="w-2 rounded-full bg-tide/80"
            style={{
              height: `${muted ? 12 : h}%`,
              animation: muted
                ? undefined
                : `soft-pulse ${2 + (i % 5) * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.05}s`,
            }}
          />
        ))}
      </div>

      <p className="mt-8 text-xl font-semibold tracking-tight">
        {peerLabel || (role === "speaker" ? "Listener peer" : "Speaker")}
      </p>
      <p className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        {formatTimer(seconds)} / {formatTimer(maxSeconds)}
      </p>
      {seconds >= warnAt ? (
        <p className="mt-2 text-sm font-medium text-tide">
          5 minuti rimanenti — soft warning
        </p>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="rounded-2xl border border-ink/15 bg-foam px-5 py-3 text-sm font-semibold"
        >
          {muted ? "Unmute" : "Mute"}
        </button>
        <button
          type="button"
          onClick={hangUp}
          className="rounded-2xl bg-destructive/90 px-5 py-3 text-sm font-semibold text-white"
        >
          Hang up
        </button>
        <button
          type="button"
          onClick={() => setShowReport((v) => !v)}
          className="rounded-2xl border border-ink/15 px-5 py-3 text-sm font-semibold"
        >
          Segnala
        </button>
      </div>

      {showReport ? (
        <div className="mt-6 w-full rounded-2xl border border-ink/10 bg-mist/80 p-4 text-left text-sm">
          <p className="font-semibold">Segnala un problema</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>Abuso / tono scorretto</li>
            <li>Spinta a contatti off-platform</li>
            <li>Qualità tecnica / no-show</li>
            <li>Altro</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            MVP: la segnalazione è locale (UI). Review ops arriva in seguito.
          </p>
          <Link
            href="/aiuto/emergenza"
            className="mt-3 inline-flex font-semibold text-destructive underline"
          >
            Emergenza →
          </Link>
        </div>
      ) : null}

      <p className="mt-10 text-xs text-muted-foreground">
        Nessun video · nessun numero · nessuna registrazione
      </p>
    </div>
  );
}
