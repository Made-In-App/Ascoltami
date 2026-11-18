import Link from "next/link";
import { Suspense } from "react";
import { CtaLink } from "@/components/cta-link";
import { PageShell } from "@/components/page-shell";
import { SKUS, type SkuId } from "@/lib/pricing";

type PageProps = {
  searchParams: Promise<{ sku?: string; mode?: string }>;
};

async function OkContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const skuId = (params.sku ?? "call5") as SkuId;
  const sku = SKUS[skuId] ?? SKUS.call5;
  const stub = params.mode !== "stripe";

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Pagamento
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Conferma
      </h1>
      <p className="mt-4 text-muted-foreground">
        {sku.directCall
          ? "Chiamata diretta pronta: avviamo il matching."
          : `Pack accreditato (${sku.tokens} token). Puoi chiamare con 1 token.`}
      </p>
      {stub ? (
        <p className="mt-4 rounded-2xl border border-ink/10 bg-mist/70 px-4 py-3 text-sm text-muted-foreground">
          Modalità stub (Stripe non attivo o fallback). In produzione il webhook
          Stripe aggiornerà il wallet.
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3">
        {sku.directCall ? (
          <CtaLink href="/ascolto/match?paid=call5">Avvia match</CtaLink>
        ) : (
          <CtaLink href="/ascolto/home">Vai alla home</CtaLink>
        )}
        <Link
          href="/ascolto/wallet"
          className="inline-flex items-center font-semibold underline"
        >
          Wallet
        </Link>
      </div>
    </>
  );
}

export default function CheckoutOkPage(props: PageProps) {
  return (
    <PageShell narrow>
      <Suspense fallback={<p className="text-muted-foreground">Conferma…</p>}>
        <OkContent {...props} />
      </Suspense>
    </PageShell>
  );
}
