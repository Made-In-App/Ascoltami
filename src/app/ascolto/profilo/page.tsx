"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { readSession, type UserSession } from "@/lib/auth-store";

export default function SpeakerProfilePage() {
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Profilo
      </h1>
      {session ? (
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Nickname</dt>
            <dd className="font-medium">{session.nickname}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium">{session.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Motivi</dt>
            <dd className="font-medium">
              {session.speaker?.motives.join(", ") || "—"}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-muted-foreground">Nessuna sessione.</p>
      )}
      <Link href="/ascolto/home" className="mt-8 inline-flex font-semibold text-tide underline">
        Home
      </Link>
    </PageShell>
  );
}
