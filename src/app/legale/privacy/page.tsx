import { PageShell } from "@/components/page-shell";

export default function PrivacyPage() {
  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Privacy
      </h1>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Bozza MVP. In questa demo i dati account restano nel tuo browser
          (localStorage). In produzione useremo un backend con base giuridica
          GDPR, retention limitata e DPIA dove richiesto.
        </p>
        <p>
          Minimizzazione: preferiamo categorie non cliniche per il matching.
          Nessuna registrazione delle chiamate.
        </p>
      </div>
    </PageShell>
  );
}
