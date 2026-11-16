/**
 * Configurazione del sito — aggiorna qui numero, orari, prezzo e testi.
 */
export const site = {
  brand: "AscoltoAperto",
  tagline: "Ascolto e confronto, da persona a persona",
  about:
    "Non sono uno psicologo: ho 18 anni e voglio parlarti, ascoltarti e cercare di capirti in base alle tue esperienze.",
  /** Prezzo in euro per sbloccare il numero */
  priceEuro: 5,
  /** Numero visibile dopo il pagamento */
  phoneDisplay: "+39 320 378 8296",
  /** Formato tel: link (es. "+391234567890") — senza spazi */
  phoneTel: "+393203788296",
  /** Metti true quando il numero reale è pronto */
  phoneReady: true,
  hours: "Lun–Ven 9:00–18:00 · Sab 14:00–02:00",
  email: "info@ascoltoaperto.it",
} as const;

export function callHref(): string | null {
  if (!site.phoneReady || !site.phoneTel) return null;
  return `tel:${site.phoneTel}`;
}

export function priceLabel(): string {
  return `€${site.priceEuro}`;
}
