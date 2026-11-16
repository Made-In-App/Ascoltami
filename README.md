# AscoltoAperto

Sito per una **linea di ascolto a pagamento**: un ragazzo di 18 anni ascolta e cerca di capirti in base alle tue esperienze. Non è un servizio psicologico professionale.

## Flusso

1. L’utente paga online (Stripe Checkout)
2. Dopo il pagamento vede il numero
3. Chiama negli orari indicati

Prezzo attuale: **€5** (modificabile in `src/lib/site.ts` → `priceEuro`)  
Numero: **+39 320 378 8296**  
Orari: Lun–Ven 9:00–18:00 · Sab 14:00–02:00

## Stripe

L’app legge `STRIPE_SECRET_KEY`.

- Se la chiave **non** c’è: modalità esempio — il pulsante sblocca comunque il numero (utile in locale / anteprima).
- Se la chiave **c’è**: pagamento reale su Stripe, poi sblocco del numero.

## Avvio in locale

```bash
npm install
npm run dev
```

Apri [http://127.0.0.1:3847](http://127.0.0.1:3847).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Stripe.
