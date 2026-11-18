import { PageShell } from "@/components/page-shell";

export default function TermsPage() {
  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Termini di servizio
      </h1>
      <p className="mt-4 rounded-2xl border border-ink/10 bg-mist/70 px-4 py-3 text-sm text-muted-foreground">
        Bozza informativa di prodotto. I documenti ufficiali saranno pubblicati
        dopo revisione legale.
      </p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-muted-foreground">
        <p>
          Ascoltami è un marketplace di peer listening audio-only per
          maggiorenni (18+). Non è terapia, counseling clinico né servizio di
          emergenza.
        </p>
        <p>
          È vietato scambiare contatti esterni o spostare la chiamata fuori
          piattaforma. Nessuna registrazione audio delle sessioni.
        </p>
        <p>
          I prezzi consumer sono €5 (chiamata), pack 5 €22, pack 10 €40.
          Trattamento IVA da confermare con commercialista.
        </p>
      </div>
    </PageShell>
  );
}
