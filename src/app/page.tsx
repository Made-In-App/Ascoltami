import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/cta-link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { formatEur, SKUS } from "@/lib/pricing";
import { disclaimers, site } from "@/lib/site";

const steps = [
  {
    n: "01",
    title: "Paga o usa un token",
    text: "Chiamata diretta a €5, oppure pack 5 / 10. Prezzo chiaro, niente al minuto.",
  },
  {
    n: "02",
    title: "Match con un Listener",
    text: "Cerchiamo un ascoltatore disponibile. In MVP: coda se nessuno è online — niente bot.",
  },
  {
    n: "03",
    title: "Audio nel browser",
    text: "Sessione audio-only ≤30′ su Ascoltami. Niente video, niente numeri esterni.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="noise-overlay relative isolate min-h-[100svh] overflow-hidden text-foam">
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
              Uno spazio sicuro per raccontarti. Solo audio.
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-lg text-pretty text-base leading-relaxed text-foam/72 sm:text-lg">
              Peer listening nel browser — non è terapia. Niente numero di
              telefono da condividere.
            </p>

            <div className="animate-rise-delay-3 mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <CtaLink href="/eta?next=/registrati&role=speaker">
                Chiamata audio · {formatEur(SKUS.call5.priceEur)}
              </CtaLink>
              <CtaLink href="/prezzi" tone="ghost" className="text-foam">
                Pack da {formatEur(SKUS.pack5.priceEur)}
              </CtaLink>
            </div>

            <p className="mt-8 max-w-xl text-sm text-foam/55">{disclaimers.short}</p>
          </div>
        </section>

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
                Paga, match, parla. Tutto in Ascoltami, audio-only.
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

            <div className="mt-14">
              <Link
                href="/come-funziona"
                className="font-semibold text-tide underline underline-offset-4"
              >
                Dettagli passo passo
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-foam px-5 py-24 sm:px-8 sm:py-32">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
              Listino
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] text-ink">
              Prezzi chiari
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Sessione umana audio ≤30′. Payout Listener fisso{" "}
              {formatEur(3.5)} a sessione completata.
            </p>

            <ul className="mt-12 grid gap-8 border-t border-ink/8 pt-10 md:grid-cols-3">
              {([SKUS.call5, SKUS.pack5, SKUS.pack10] as const).map((sku) => (
                <li key={sku.id} className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-tide">
                    {sku.label}
                  </p>
                  <p className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em] text-ink">
                    {formatEur(sku.priceEur)}
                  </p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {sku.description}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-4">
              <CtaLink href="/eta?next=/registrati">Inizia · 18+</CtaLink>
              <CtaLink href="/prezzi" tone="ink">
                Vedi prezzi
              </CtaLink>
            </div>
          </div>
        </section>

        <section className="noise-overlay relative overflow-hidden bg-ink px-5 py-24 text-foam sm:px-8 sm:py-32">
          <div
            className="pointer-events-none absolute -right-20 top-0 size-[28rem] rounded-full bg-tide/30 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto max-w-6xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-signal">
              Due lati
            </p>
            <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.05em]">
              Parlare o ascoltare
            </h2>
            <p className="mt-5 max-w-md text-lg text-foam/65">
              Speaker: raccontati con chi è disponibile. Listener: ascolto attivo
              in piattaforma, {formatEur(3.5)} a sessione.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <CtaLink href="/eta?next=/registrati">Voglio parlare</CtaLink>
              <CtaLink
                href="/eta?next=/registrati"
                tone="foam"
              >
                Diventa ascoltatore
              </CtaLink>
            </div>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-foam/55">
              {disclaimers.clinical} Orario live consigliato: {site.hours}.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
