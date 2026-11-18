import { PageShell } from "@/components/page-shell";

export default function PrivacyPage() {
  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Privacy
      </h1>
      <p className="mt-4 rounded-2xl border border-ink/10 bg-mist/70 px-4 py-3 text-sm text-muted-foreground">
        Bozza informativa di prodotto. I documenti ufficiali saranno pubblicati
        dopo revisione legale.
      </p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Trattiamo i dati necessari all’account, al matching e ai pagamenti
          secondo la Privacy Policy ufficiale (in pubblicazione). Preferiamo
          categorie non cliniche per il matching.
        </p>
        <p>
          Nessuna registrazione delle chiamate. Minimizzazione e retention
          limitata dove richiesto dal GDPR.
        </p>
      </div>
    </PageShell>
  );
}
