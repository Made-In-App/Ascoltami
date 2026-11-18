import { PageShell } from "@/components/page-shell";

export default function CookiePage() {
  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Cookie
      </h1>
      <p className="mt-4 rounded-2xl border border-ink/10 bg-mist/70 px-4 py-3 text-sm text-muted-foreground">
        Bozza informativa di prodotto. I documenti ufficiali saranno pubblicati
        dopo revisione legale.
      </p>
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Usiamo cookie tecnici necessari al funzionamento (es. conferma età 18+
        e sessione di accesso). Nessuna pubblicità profilata in questa fase.
      </p>
    </PageShell>
  );
}
