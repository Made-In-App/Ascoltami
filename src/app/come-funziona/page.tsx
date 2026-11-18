import { CtaLink } from "@/components/cta-link";
import { PageShell } from "@/components/page-shell";

const steps = [
  {
    title: "Registrati (18+)",
    text: "Confermi l’età, scegli Speaker o Listener, crei il profilo di matching.",
  },
  {
    title: "Paga o usa un token",
    text: "€5 chiamata diretta, oppure pack 5 (€22) / pack 10 (€40).",
  },
  {
    title: "Match e audio",
    text: "Aspetti un Listener disponibile e entri in room audio-only nel browser.",
  },
];

export default function HowItWorksPage() {
  return (
    <PageShell>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Guida
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,3.75rem)] font-bold tracking-[-0.04em]">
        Come funziona
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Marketplace peer: ascolto umano, solo web, solo audio. Niente bot in
        questa fase MVP.
      </p>

      <ol className="mt-14 space-y-10 border-t border-ink/10 pt-12">
        {steps.map((step, i) => (
          <li key={step.title} className="grid gap-3 md:grid-cols-[5rem_1fr]">
            <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-ink/15">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{step.title}</h2>
              <p className="mt-2 max-w-xl text-muted-foreground leading-relaxed">
                {step.text}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-14">
        <CtaLink href="/eta?next=/registrati">Inizia</CtaLink>
      </div>
    </PageShell>
  );
}
