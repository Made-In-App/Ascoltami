import { Suspense } from "react";
import { AgeGateForm } from "@/components/age-gate-form";
import { PageShell } from "@/components/page-shell";
import { site } from "@/lib/site";

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

async function AgeGateContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const nextPath = params.next?.startsWith("/") ? params.next : "/registrati";

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        {site.brand} · Accesso 18+
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em] text-ink">
        Conferma la tua età
      </h1>
      <p className="mt-3 text-muted-foreground leading-relaxed">
        Autodichiarazione: Ascoltami è per maggiorenni. Nessun provider di age
        assurance in MVP.
      </p>
      <div className="mt-10">
        <AgeGateForm nextPath={nextPath} />
      </div>
    </>
  );
}

export default function AgeGatePage(props: PageProps) {
  return (
    <PageShell narrow>
      <Suspense fallback={<p className="text-muted-foreground">Caricamento…</p>}>
        <AgeGateContent {...props} />
      </Suspense>
    </PageShell>
  );
}
