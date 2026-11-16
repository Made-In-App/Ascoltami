import { NextRequest, NextResponse } from "next/server";
import {
  allowMockCheckout,
  appBaseUrl,
  checkoutAmountCents,
  getStripe,
  stripeConfigured,
} from "@/lib/stripe";
import { site } from "@/lib/site";

export async function POST(req: NextRequest) {
  const origin = appBaseUrl(req);

  if (!stripeConfigured()) {
    if (!allowMockCheckout()) {
      return NextResponse.json(
        { error: "Pagamento non configurato" },
        { status: 503 }
      );
    }
    // Dev-only sample path when Stripe is unset
    return NextResponse.json({
      url: `${origin}/accesso?session_id=mock_paid`,
      mock: true,
    });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Pagamento non disponibile" },
      { status: 503 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "it",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: checkoutAmountCents(),
            product_data: {
              name: `Ascolto — ${site.brand}`,
              description:
                "Accesso al numero per una chiamata di ascolto e confronto (non è terapia professionale).",
            },
          },
        },
      ],
      success_url: `${origin}/accesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=1`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Impossibile avviare il pagamento" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url, mock: false });
  } catch (error) {
    console.error("Stripe checkout error", error);
    return NextResponse.json(
      { error: "Errore durante la creazione del pagamento" },
      { status: 500 }
    );
  }
}
