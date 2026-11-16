/**
 * Configurazione del sito — aggiorna il numero quando lo ricevi.
 * Imposta `phoneReady: true` e inserisci display + tel (solo cifre con prefisso).
 */
export const site = {
  brand: "AscoltoAperto",
  tagline: "Consulenza psicologica gratuita al telefono",
  /** Numero visibile agli utenti (es. "+39 123 456 7890") */
  phoneDisplay: "+39 320 378 8296",
  /** Formato tel: link (es. "+391234567890") — senza spazi */
  phoneTel: "+393203788296",
  /** Metti true quando il numero reale è pronto */
  phoneReady: true,
  hours: "Lun–Ven 9:00–18:00 · Sab 10:00–13:00",
  email: "info@ascoltoaperto.it",
} as const;

export function callHref(): string | null {
  if (!site.phoneReady || !site.phoneTel) return null;
  return `tel:${site.phoneTel}`;
}
