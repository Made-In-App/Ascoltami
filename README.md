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

L’app legge `STRIPE_SECRET_KEY` (obbligatoria in produzione).

- **Produzione**: senza chiave il pagamento resta chiuso (nessuno sblocco del numero).
- **Sviluppo locale** (`NODE_ENV=development`) senza chiave: sblocco di esempio solo in locale.
- La sessione finta `mock_paid` non sblocca mai il numero se Stripe è configurato, né in produzione.

Opzionale: `APP_BASE_URL` (es. `https://ascoltami.apps.grok.bot`) per i redirect Stripe. Se assente si usa l’origine della richiesta Next.js, senza fidarsi di header `x-forwarded-*` forgiati.

## Avvio in locale

```bash
npm install
npm run dev
```

Apri [http://127.0.0.1:3847](http://127.0.0.1:3847).

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Stripe.
