# AscoltoAperto

Sito web per una **linea di consulenza psicologica gratuita** al telefono: le persone chiamano, parlano con uno psicologo e cercano insieme una via per affrontare il problema.

## Cosa fa il sito

- Presenta il servizio in modo chiaro e rassicurante
- Mette in evidenza il numero da chiamare (gratuito)
- Spiega come funziona e di cosa si può parlare
- Include un avviso per le emergenze (112)

## Numero di telefono

Il numero si configura in un solo file:

```ts
// src/lib/site.ts
export const site = {
  phoneDisplay: "+39 123 456 7890", // come lo vedi sul sito
  phoneTel: "+391234567890",        // solo per il link tel:
  phoneReady: true,                 // attiva i pulsanti Chiama
  // ...
}
```

Finché `phoneReady` è `false`, il sito mostra «Numero in arrivo».

## Avvio in locale

```bash
npm install
npm run dev
```

Apri [http://127.0.0.1:3847](http://127.0.0.1:3847).

## Script

| Comando        | Descrizione              |
|----------------|--------------------------|
| `npm run dev`  | Server di sviluppo       |
| `npm run build`| Build di produzione      |
| `npm run start`| Avvia la build           |
| `npm run lint` | ESLint                   |

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
