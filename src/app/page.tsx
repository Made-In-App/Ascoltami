import Image from "next/image";
import { CallButton } from "@/components/call-button";
import { SiteHeader } from "@/components/site-header";
import { callHref, site } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Componi il numero",
    text: "La chiamata è gratuita. Non serve appuntamento né registrazione.",
  },
  {
    n: "02",
    title: "Racconta cosa ti pesa",
    text: "Uno psicologo ti ascolta con rispetto, senza giudizio e senza fretta.",
  },
  {
    n: "03",
    title: "Cerca insieme una via",
    text: "Lavoriamo sul problema concreto: chiarezza, strumenti e prossimo passo.",
  },
];

const topics = [
  "Ansia, stress e pensieri che non si fermano",
  "Difficoltà in famiglia o nella relazione di coppia",
  "Lavoro, burnout e senso di blocco",
  "Solitudine, lutto o un momento di crisi",
  "Dubbi su te stesso e sulle scelte da fare",
];

export default function Home() {
  const href = callHref();

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* Hero — one composition */}
        <section
          id="inizio"
          className="relative isolate min-h-[100svh] overflow-hidden text-foam"
        >
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            className="animate-drift object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-ink/75 via-tide/55 to-ink/40"
            aria-hidden
          />
          <div
            className="animate-soft-pulse pointer-events-none absolute -left-20 top-1/4 size-72 rounded-full bg-tide/30 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20 lg:justify-center lg:pb-24">
            <p className="animate-rise font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {site.brand}
            </p>
            <h1 className="animate-rise-delay-1 mt-5 max-w-xl text-balance text-2xl font-medium leading-snug text-foam/95 sm:text-3xl md:text-4xl">
              Uno psicologo ti ascolta. Gratis.
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-md text-pretty text-base leading-relaxed text-foam/80 sm:text-lg">
              Hai un problema e non sai da dove iniziare? Chiama: insieme
              cerchiamo di capirlo e di trovare una via.
            </p>
            <div className="animate-rise-delay-3 mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <CallButton />
              <p className="text-sm text-foam/70">{site.hours}</p>
            </div>
          </div>
        </section>

        {/* Come funziona */}
        <section id="come-funziona" className="bg-mist/60 px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Come funziona
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Tre passi semplici. Nessun costo, nessun impegno oltre la chiamata.
            </p>

            <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
              {steps.map((step) => (
                <li key={step.n} className="relative">
                  <span className="font-[family-name:var(--font-heading)] text-5xl font-semibold text-tide/25">
                    {step.n}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Temi */}
        <section id="temi" className="bg-foam px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                Di cosa possiamo parlare
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Non serve avere le idee chiare. Se qualcosa ti pesa, puoi
                chiamare: partiamo da lì.
              </p>
            </div>
            <ul className="space-y-0 divide-y divide-border">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="py-4 text-lg text-ink first:pt-0 last:pb-0"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA + emergenza */}
        <section
          id="chiama"
          className="relative overflow-hidden bg-gradient-to-br from-tide to-ink px-5 py-20 text-foam sm:px-8 sm:py-28"
        >
          <div
            className="pointer-events-none absolute right-0 top-0 size-80 translate-x-1/3 -translate-y-1/3 rounded-full bg-foam/10 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl font-semibold tracking-tight sm:text-4xl">
              Pronto a parlare?
            </h2>
            <p className="mt-3 max-w-md text-foam/80">
              {site.phoneReady
                ? `Componi ${site.phoneDisplay}: rispondiamo durante gli orari indicati.`
                : "Il numero gratuito sarà pubblicato a breve. Nel frattempo puoi lasciare il sito pronto: aggiorneremo il contatto appena disponibile."}
            </p>
            <div className="mt-8">
              <CallButton className="bg-foam text-ink hover:bg-foam/90" />
            </div>

            <aside className="mt-14 max-w-2xl border-t border-foam/20 pt-8 text-sm leading-relaxed text-foam/75">
              <p className="font-medium text-foam">In caso di emergenza</p>
              <p className="mt-2">
                Se sei in pericolo immediato o pensi di farti del male, chiama
                subito il{" "}
                <a href="tel:112" className="underline underline-offset-2">
                  112
                </a>{" "}
                o recati al pronto soccorso. AscoltoAperto è un servizio di
                ascolto e orientamento, non sostituisce un intervento di
                emergenza.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-mist/40 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-lg font-semibold text-ink">
              {site.brand}
            </p>
            <p className="text-sm text-muted-foreground">{site.tagline}</p>
          </div>
          <div className="text-sm text-muted-foreground sm:text-right">
            {href ? (
              <a href={href} className="font-medium text-tide hover:underline">
                {site.phoneDisplay}
              </a>
            ) : (
              <span>Numero in arrivo</span>
            )}
            <p className="mt-1">{site.hours}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
