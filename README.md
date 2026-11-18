# Ascoltami

Marketplace web di **peer listening** audio-only (non terapia). Brand **Ascoltami**, 18+, listino €5 / pack €22 / pack €40.

## Sviluppo

```bash
npm install
npm run dev
```

Apre su [http://127.0.0.1:3847](http://127.0.0.1:3847).

## Produzione (target)

Stack consigliato: **Next.js** (questo repo) + **Vercel** + Postgres + Stripe + LiveKit Cloud.  
CI preferita: **Vercel Git** su `Made-In-App/Ascoltami` (auto-deploy su push a `main`) — niente Actions obbligatorie.  
SiteGround: DNS/mail del dominio, non runtime LAMP dell’app audio.

### Env su Vercel

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `DATABASE_URL`, `AUTH_SECRET`
- `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL` (quando l’audio reale è pronto)

## Copy

Source of truth UI: copy definitivo lockato nel Project (`docs/ascoltami-copy-definitivo.md`).
