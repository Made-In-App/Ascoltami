import { NextResponse } from "next/server";

const SKU_PRICES: Record<string, { amountCents: number; label: string; tokens: number }> = {
  call5: { amountCents: 500, label: "Chiamata diretta Ascoltami", tokens: 0 },
  pack5: { amountCents: 2200, label: "Pack 5 Ascoltami", tokens: 5 },
  pack10: { amountCents: 4000, label: "Pack 10 Ascoltami", tokens: 10 },
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    sku?: string;
  } | null;
  const sku = body?.sku ?? "";
  const item = SKU_PRICES[sku];
  if (!item) {
    return NextResponse.json({ error: "SKU non valido" }, { status: 400 });
  }

  const sessionId = `cs_stub_${Date.now().toString(36)}`;
  const secret = process.env.STRIPE_SECRET_KEY;

  if (secret && secret.startsWith("sk_")) {
    try {
      const origin = new URL(request.url).origin;
      const params = new URLSearchParams();
      params.set("mode", "payment");
      params.set("success_url", `${origin}/ascolto/checkout/ok?sku=${sku}&mode=stripe&sid={CHECKOUT_SESSION_ID}`);
      params.set("cancel_url", `${origin}/ascolto/checkout?sku=${sku}`);
      params.set("line_items[0][price_data][currency]", "eur");
      params.set(
        "line_items[0][price_data][product_data][name]",
        item.label
      );
      params.set(
        "line_items[0][price_data][unit_amount]",
        String(item.amountCents)
      );
      params.set("line_items[0][quantity]", "1");
      params.set("metadata[sku]", sku);
      params.set("metadata[tokens]", String(item.tokens));

      const stripeRes = await fetch(
        "https://api.stripe.com/v1/checkout/sessions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secret}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        }
      );

      if (stripeRes.ok) {
        const data = (await stripeRes.json()) as {
          id: string;
          url: string | null;
        };
        return NextResponse.json({
          mode: "stripe",
          sessionId: data.id,
          url: data.url,
        });
      }
    } catch {
      // fall through to stub
    }
  }

  return NextResponse.json({
    mode: "stub",
    sessionId,
    message:
      "Stripe non configurato: checkout stub. Aggiungi STRIPE_SECRET_KEY per pagamenti reali.",
  });
}
