# AscoltoAperto

Sito per una **linea di ascolto gratuita** al telefono: un ragazzo di 18 anni ascolta, parla con te e cerca di capirti in base alle tue esperienze. Non è un servizio psicologico professionale.

## Cosa fa il sito

- Presenta chi risponde e cosa offre (ascolto, non terapia)
- Mette in evidenza il numero da chiamare
- Spiega come funziona e di cosa si può parlare
- Include un avviso chiaro per le emergenze (112)

## Configurazione

Testi, orari e numero stanno in `src/lib/site.ts`.

Numero attuale: **+39 320 378 8296**  
Orari: Lun–Ven 9:00–18:00 · Sab 14:00–02:00

## Avvio in locale

```bash
npm install
npm run dev
```

Apri [http://127.0.0.1:3847](http://127.0.0.1:3847).

## Script

| Comando         | Descrizione        |
|-----------------|--------------------|
| `npm run dev`   | Server di sviluppo |
| `npm run build` | Build di produzione|
| `npm run start` | Avvia la build     |
| `npm run lint`  | ESLint             |

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
