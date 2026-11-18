import { Suspense } from "react";
import { CheckoutClient } from "@/components/checkout-client";
import { PageShell } from "@/components/page-shell";
import type { SkuId } from "@/lib/pricing";

type PageProps = {
  searchParams: Promise<{ sku?: string }>;
};

function isSku(value: string | undefined): value is SkuId {
  return value === "call5" || value === "pack5" || value === "pack10";
}

async function CheckoutContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const sku: SkuId = isSku(params.sku) ? params.sku : "call5";
  return <CheckoutClient skuId={sku} />;
}

export default function CheckoutPage(props: PageProps) {
  return (
    <PageShell narrow>
      <Suspense fallback={<p className="text-muted-foreground">Checkout…</p>}>
        <CheckoutContent {...props} />
      </Suspense>
    </PageShell>
  );
}
