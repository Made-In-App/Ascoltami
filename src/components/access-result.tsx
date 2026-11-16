"use client";

import { useEffect, useState } from "react";
import { CallButton } from "@/components/call-button";

type StatusResponse = {
  paid?: boolean;
  mock?: boolean;
  phoneDisplay?: string;
  phoneHref?: string | null;
  hours?: string;
  error?: string;
};

export function AccessResult() {
  const [status, setStatus] = useState<"loading" | "paid" | "unpaid" | "error">(
    "loading"
  );
  const [data, setData] = useState<StatusResponse | null>(null);

  useEffect(() => {
    const sessionId =
      new URLSearchParams(window.location.search).get("session_id") ?? "";

    if (!sessionId) {
      setStatus("unpaid");
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `/api/checkout/status?session_id=${encodeURIComponent(sessionId)}`
        );
        const json = (await res.json()) as StatusResponse;
        if (cancelled) return;
        setData(json);
        if (json.paid && json.phoneHref && json.phoneDisplay) {
          setStatus("paid");
        } else if (!res.ok) {
          setStatus("error");
        } else {
          setStatus("unpaid");
        }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="rounded-3xl border border-ink/8 bg-foam p-6 text-muted-foreground">
        Verifica del pagamento in corso…
      </div>
    );
  }

  if (status === "paid" && data?.phoneDisplay && data.phoneHref) {
    return (
      <div className="rounded-3xl border border-ink/8 bg-foam p-6 sm:p-8">
        {data.mock ? (
          <p className="mb-4 rounded-2xl bg-mist px-3 py-2 text-xs text-muted-foreground">
            Dati di esempio: Stripe non è ancora collegato. Il numero è mostrato
            come anteprima.
          </p>
        ) : null}
        <p className="text-sm text-muted-foreground">Puoi chiamare ora</p>
        <p className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-ink">
          {data.phoneDisplay}
        </p>
        {data.hours ? (
          <p className="mt-2 text-sm text-muted-foreground">{data.hours}</p>
        ) : null}
        <div className="mt-6">
          <CallButton phoneDisplay={data.phoneDisplay} phoneHref={data.phoneHref} />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-ink/8 bg-foam p-6 sm:p-8">
      <p className="font-semibold text-ink">Pagamento non trovato</p>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {data?.error ??
          "Torna alla home e completa il pagamento per sbloccare il numero."}
      </p>
      <a
        href="/#chiama"
        className="mt-6 inline-flex h-11 items-center rounded-2xl bg-ink px-5 text-sm font-semibold text-foam"
      >
        Torna al pagamento
      </a>
    </div>
  );
}
