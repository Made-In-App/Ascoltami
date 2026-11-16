/**
 * Configurazione del sito — aggiorna qui email, orari e testi.
 */
export const site = {
  brand: "AscoltoAperto",
  tagline: "Ascolto e confronto, da persona a persona",
  about:
    "Non sono uno psicologo: ho 18 anni e voglio parlarti, ascoltarti e cercare di capirti in base alle tue esperienze.",
  email: "jacopo.gennuso@gmail.com",
  hours: "Lun–Ven 9:00–18:00 · Sab 14:00–02:00",
} as const;

export function bookHref(): string {
  const subject = encodeURIComponent("Prenotazione AscoltoAperto");
  const body = encodeURIComponent(
    "Ciao Jacopo,\n\nvorrei prenotare un momento per parlare.\n\nGrazie."
  );
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}
