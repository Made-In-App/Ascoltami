"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { readSession, type UserSession } from "@/lib/auth-store";

export default function ListenerProfilePage() {
  const [session, setSession] = useState<UserSession | null>(null);

  useEffect(() => {
    setSession(readSession());
  }, []);

  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Profilo
      </h1>
      {session?.listener ? (
        <dl className="mt-8 space-y-4 text-sm">
          <div>
            <dt className="text-muted-foreground">Nickname</dt>
            <dd className="font-medium">{session.nickname}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Bio</dt>
            <dd className="font-medium">{session.listener.bio || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Disponibilità</dt>
            <dd className="font-medium">
              {session.listener.availabilityNote || "—"}
            </dd>
          </div>
        </dl>
      ) : (
        <p className="mt-6 text-muted-foreground">Nessuna sessione.</p>
      )}
      <Link
        href="/ascoltatore/home"
        className="mt-8 inline-flex font-semibold text-tide underline"
      >
        Home
      </Link>
    </PageShell>
  );
}
