import { PageShell } from "@/components/page-shell";

export default function CookiePage() {
  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Cookie
      </h1>
      <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
        Bozza MVP. Usiamo un cookie tecnico per il gate età 18+ (
        <code>ascoltami_age_ok</code>). Nessuna pubblicità profilata in questa
        fase.
      </p>
    </PageShell>
  );
}
