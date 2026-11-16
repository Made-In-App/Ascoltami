import { NextRequest, NextResponse } from "next/server";
import {
  allowMockCheckout,
  getStripe,
  stripeConfigured,
} from "@/lib/stripe";
import { callHref, site } from "@/lib/site";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { paid: false, error: "Sessione mancante" },
      { status: 400 }
    );
  }

  if (sessionId === "mock_paid") {
    if (!allowMockCheckout()) {
      return NextResponse.json(
        { paid: false, error: "Sessione di esempio non valida" },
        { status: 400 }
      );
    }
    return NextResponse.json({
      paid: true,
      mock: true,
      phoneDisplay: site.phoneDisplay,
      phoneHref: callHref(),
      hours: site.hours,
    });
  }

  if (!stripeConfigured()) {
    return NextResponse.json(
      { paid: false, error: "Pagamento non configurato" },
      { status: 503 }
    );
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { paid: false, error: "Pagamento non disponibile" },
      { status: 503 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid =
      session.payment_status === "paid" || session.status === "complete";

    if (!paid) {
      return NextResponse.json({ paid: false });
    }

    return NextResponse.json({
      paid: true,
      mock: false,
      phoneDisplay: site.phoneDisplay,
      phoneHref: callHref(),
      hours: site.hours,
    });
  } catch (error) {
    console.error("Stripe status error", error);
    return NextResponse.json(
      { paid: false, error: "Sessione non valida" },
      { status: 400 }
    );
  }
}
