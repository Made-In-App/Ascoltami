# Ascoltami

Marketplace web di **peer listening** audio-only (non terapia). Brand **Ascoltami**, 18+, listino €5 / pack €22 / pack €40.

## Sviluppo

```bash
npm install
npm run dev
```

Apre su [http://127.0.0.1:3847](http://127.0.0.1:3847).

## MVP: cosa è reale vs stub

| Area | Stato |
| --- | --- |
| Landing, prezzi, legale, age gate 18+ | UI reale |
| Auth Speaker/Listener | Leggera (localStorage browser) |
| Checkout | Stripe se `STRIPE_SECRET_KEY`, altrimenti stub |
| Matching | Placeholder / waiting UI |
| Call room | UI audio-only; LiveKit stub senza chiavi |
| Bot | Fuori MVP (fase 1.5) |

## Secrets da aggiungere (hosting)

- `STRIPE_SECRET_KEY` — Checkout reale
- `LIVEKIT_API_KEY` / `LIVEKIT_API_SECRET` / URL LiveKit — room audio reale (quando integrate)

Non servono numeri di telefono: il contatto resta solo in piattaforma.
