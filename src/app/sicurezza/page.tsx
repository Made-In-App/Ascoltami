import { PageShell } from "@/components/page-shell";

const points = [
  {
    title: "Solo in piattaforma",
    text: "Audio WebRTC nel browser. Niente numeri, WhatsApp o dialer esterni.",
  },
  {
    title: "Nessuna registrazione",
    text: "Le chiamate non vengono registrate — né di default né come feature.",
  },
  {
    title: "Report e strike",
    text: "Puoi segnalare abuso o tentativi di contatto fuori sito. Strike gravi per off-platform.",
  },
  {
    title: "Crisi",
    text: "Non siamo un servizio di emergenza. In pericolo chiama 112 o linee locali.",
  },
];

export default function SafetyPage() {
  return (
    <PageShell>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Trust
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2.2rem,5vw,3.75rem)] font-bold tracking-[-0.04em]">
        Sicurezza
      </h1>
      <ul className="mt-12 grid gap-10 border-t border-ink/10 pt-12 md:grid-cols-2">
        {points.map((p) => (
          <li key={p.title}>
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{p.text}</p>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
