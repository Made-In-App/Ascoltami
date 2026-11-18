"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createSession,
  isAgeVerifiedFromCookie,
  requireAgeGatePath,
  type Role,
} from "@/lib/auth-store";

type Mode = "register" | "login";

type AuthFormProps = {
  mode: Mode;
  defaultRole?: Role;
};

export function AuthForm({ mode, defaultRole = "speaker" }: AuthFormProps) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(defaultRole);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isAgeVerifiedFromCookie()) {
      router.push(
        requireAgeGatePath(
          mode === "register" ? "/registrati" : "/accedi"
        )
      );
      return;
    }

    if (!email.includes("@") || password.length < 6) {
      setError("Email valida e password di almeno 6 caratteri.");
      return;
    }

    // Sessione locale temporanea finché non c’è auth server-side.
    const session = createSession({ email, role });
    if (session.role === "listener") {
      router.push(
        session.listener?.completed
          ? "/ascoltatore/home"
          : "/ascoltatore/onboarding"
      );
    } else {
      router.push(
        session.speaker?.completed ? "/ascolto/home" : "/ascolto/onboarding"
      );
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {mode === "register" ? (
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-ink">Voglio</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(
              [
                ["speaker", "Parlare"],
                ["listener", "Ascoltare"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`cursor-pointer rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                  role === value
                    ? "border-tide bg-tide/10 text-ink"
                    : "border-ink/10 bg-foam text-ink/70 hover:border-ink/20"
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={value}
                  checked={role === value}
                  onChange={() => setRole(value)}
                  className="sr-only"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>
      ) : null}

      <label className="block space-y-2">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3 outline-none ring-tide/30 focus:ring-2"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium">Password</span>
        <input
          type="password"
          required
          minLength={6}
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl border border-ink/12 bg-foam px-4 py-3 outline-none ring-tide/30 focus:ring-2"
        />
      </label>

      <p className="text-xs text-muted-foreground">
        Nessun campo telefono: il contatto resta solo in Ascoltami.
      </p>

      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <button
        type="submit"
        className="inline-flex h-14 w-full items-center justify-center rounded-2xl bg-signal px-6 font-semibold text-ink transition hover:brightness-105"
      >
        {mode === "register" ? "Crea account" : "Accedi"}
      </button>

      <p className="text-sm text-muted-foreground">
        {mode === "register" ? (
          <>
            Hai già un account?{" "}
            <Link href="/accedi" className="font-semibold text-tide underline">
              Accedi
            </Link>
          </>
        ) : (
          <>
            Nuovo qui?{" "}
            <Link
              href="/eta?next=/registrati"
              className="font-semibold text-tide underline"
            >
              Crea account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
