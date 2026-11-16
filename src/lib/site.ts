/**
 * Configurazione del sito — aggiorna qui numero, orari e testi base.
 */
export const site = {
  brand: "AscoltoAperto",
  tagline: "Un ascolto gratuito, da persona a persona",
  about:
    "Non sono uno psicologo: ho 18 anni e voglio parlarti, ascoltarti e cercare di capirti in base alle tue esperienze.",
  /** Numero visibile agli utenti (es. "+39 123 456 7890") */
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
