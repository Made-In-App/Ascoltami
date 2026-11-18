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
SiteGround: DNS/mail del dominio, non runtime LAMP dell’app audio.

Vedi il doc progetto `docs/ascoltami-architettura-produzione.md` nello store del Project.

### Env / secrets

- `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`, `LIVEKIT_URL`
- `DATABASE_URL`, secret auth

## Copy

Source of truth UI: copy definitivo lockato nel Project (`docs/ascoltami-copy-definitivo.md`).
