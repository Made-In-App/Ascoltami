import { CtaLink } from "@/components/cta-link";
import { PageShell } from "@/components/page-shell";
import { formatEur, LISTENER_PAYOUT_EUR, SKUS } from "@/lib/pricing";

export default function PricingPage() {
  const items = [SKUS.call5, SKUS.pack5, SKUS.pack10];

  return (
    <PageShell>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Listino chiuso
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,3.75rem)] font-bold tracking-[-0.04em]">
        Prezzi
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Sessioni umane audio ≤30′ in piattaforma. Nessun pagamento al minuto.
        Payout Listener fisso {formatEur(LISTENER_PAYOUT_EUR)} a sessione
        completata.
      </p>

      <ul className="mt-14 grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-3">
        {items.map((sku) => (
          <li key={sku.id} className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-tide">
              {sku.label}
            </p>
            <p className="font-[family-name:var(--font-heading)] text-5xl font-bold tracking-[-0.05em]">
              {formatEur(sku.priceEur)}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {sku.description}
            </p>
            {!sku.directCall && sku.perSessionEur ? (
              <p className="text-sm text-ink/70">
                ≈ {formatEur(sku.perSessionEur)} a sessione
              </p>
            ) : (
              <p className="text-sm text-ink/70">
                One-shot: non crea token in wallet
              </p>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-14 flex flex-wrap gap-4">
        <CtaLink href="/eta?next=/ascolto/checkout?sku=call5">
          Chiama ora · {formatEur(5)}
        </CtaLink>
        <CtaLink href="/eta?next=/registrati" tone="ink">
          Crea account
        </CtaLink>
      </div>
    </PageShell>
  );
}
