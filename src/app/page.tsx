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
    text: "Ti ascolto con rispetto, senza giudizio e senza fretta.",
  },
  {
    n: "03",
    title: "Cerchiamo di capirci",
    text: "Parto dalle tue esperienze: insieme provo a capire cosa stai vivendo.",
  },
];

const topics = [
  "Ansia, stress e pensieri che non si fermano",
  "Difficoltà in famiglia o nella relazione",
  "Scuola, lavoro e senso di blocco",
  "Solitudine o un momento difficile",
  "Dubbi su te stesso e sulle scelte da fare",
];

export default function Home() {
  const href = callHref();

  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section
          id="inizio"
          className="noise-overlay relative isolate min-h-[100svh] overflow-hidden text-foam"
        >
          <Image
            src="/hero.jpg"
            alt=""
            fill
            priority
            className="animate-drift object-cover object-[center_35%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(120deg,oklch(0.16_0.04_210/0.82)_0%,oklch(0.28_0.05_185/0.55)_48%,oklch(0.22_0.04_200/0.35)_100%)]"
            aria-hidden
          />
          <div
            className="animate-soft-pulse pointer-events-none absolute -left-24 top-[18%] size-[28rem] rounded-full bg-signal/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-[-10%] right-[-8%] size-[22rem] rounded-full bg-tide/30 blur-3xl"
            aria-hidden
          />

          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24 lg:justify-center lg:pb-28">
            <p className="animate-rise font-[family-name:var(--font-heading)] text-[clamp(2.75rem,9vw,6.5rem)] font-bold leading-[0.92] tracking-[-0.05em]">
              {site.brand}
            </p>

            <div className="animate-line-grow mt-6 h-px w-28 bg-gradient-to-r from-signal to-transparent" />

            <h1 className="animate-rise-delay-1 mt-7 max-w-2xl text-balance text-[clamp(1.5rem,3.4vw,2.35rem)] font-medium leading-[1.15] tracking-[-0.025em] text-foam">
              Qualcuno che ti ascolta. Gratis.
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-lg text-pretty text-base leading-relaxed text-foam/72 sm:text-lg">
              {site.about}
            </p>

            <div className="animate-rise-delay-3 mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <CallButton />
              <p className="text-sm text-foam/60">{site.hours}</p>
            </div>
          </div>
        </section>

        {/* Come funziona */}
        <section
          id="come-funziona"
          className="mesh-bg relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
                  Processo
                </p>
                <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-ink">
                  Come funziona
                </h2>
              </div>
              <p className="max-w-sm text-muted-foreground md:text-right">
                Tre passi semplici. Nessun costo, nessun impegno oltre la
                chiamata.
              </p>
            </div>

            <ol className="mt-16 grid gap-0 md:grid-cols-3">
              {steps.map((step, i) => (
                <li
                  key={step.n}
                  className="group relative border-t border-ink/10 py-10 md:border-t-0 md:border-l md:px-8 md:py-2 md:first:border-l-0 md:first:pl-0"
                >
                  <span className="font-[family-name:var(--font-heading)] text-6xl font-bold tracking-[-0.06em] text-ink/[0.08] transition duration-500 group-hover:text-signal/50 sm:text-7xl">
                    {step.n}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                  {i < steps.length - 1 ? (
                    <span
                      className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-ink/15 to-transparent md:block"
                      aria-hidden
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Temi */}
        <section id="temi" className="bg-foam px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.9fr_1.2fr] lg:gap-24">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
                Ascolto
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-ink">
                Di cosa possiamo parlare
              </h2>
              <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                Non serve avere le idee chiare. Se qualcosa ti pesa, puoi
                chiamare: partiamo da lì.
              </p>
            </div>

            <ul className="space-y-0">
              {topics.map((topic, index) => (
                <li key={topic}>
                  <a
                    href={href ?? "#chiama"}
                    className="topic-row group flex items-baseline gap-5 border-b border-ink/8 py-6 transition-colors hover:text-tide"
                  >
                    <span className="w-8 shrink-0 font-[family-name:var(--font-heading)] text-sm font-semibold text-ink/25 transition group-hover:text-signal">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg tracking-tight text-ink sm:text-xl md:text-2xl">
                      {topic}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section
          id="chiama"
          className="noise-overlay relative overflow-hidden bg-ink px-5 py-24 text-foam sm:px-8 sm:py-32"
        >
          <div
            className="pointer-events-none absolute -right-20 top-0 size-[28rem] rounded-full bg-tide/30 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-16 bottom-0 size-[22rem] rounded-full bg-signal/20 blur-3xl"
            aria-hidden
          />

          <div className="relative mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
              Contatto
            </p>
            <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.05em]">
              Pronto a parlare?
            </h2>
            <p className="mt-5 max-w-md text-lg text-foam/65">
              {site.phoneReady
                ? `Componi ${site.phoneDisplay}: rispondo durante gli orari indicati.`
                : "Il numero gratuito sarà pubblicato a breve."}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CallButton tone="light" />
              <p className="text-sm text-foam/45">{site.hours}</p>
            </div>

            <aside className="mt-16 max-w-2xl rounded-3xl border border-foam/10 bg-foam/[0.04] p-6 text-sm leading-relaxed text-foam/60 backdrop-blur-sm sm:p-8">
              <p className="font-semibold text-foam">Importante sapere</p>
              <p className="mt-2">
                Non sono uno psicologo e non offro terapia professionale: solo
                ascolto e confronto. Se sei in pericolo immediato o pensi di
                farti del male, chiama subito il{" "}
                <a
                  href="tel:112"
                  className="font-medium text-signal underline decoration-signal/40 underline-offset-4"
                >
                  112
                </a>{" "}
                o recati al pronto soccorso.
              </p>
            </aside>
          </div>
        </section>
      </main>

      <footer className="border-t border-ink/8 bg-mist/50 px-5 py-12 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-[-0.04em] text-ink">
              {site.brand}
              <span className="ml-1 inline-block size-1.5 translate-y-[-0.35em] rounded-full bg-signal" />
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {site.tagline}
            </p>
          </div>
          <div className="text-sm text-muted-foreground sm:text-right">
            {href ? (
              <a
                href={href}
                className="text-base font-semibold tracking-tight text-ink transition hover:text-tide"
              >
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
