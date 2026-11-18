import { ListenerTraining } from "@/components/listener-training";
import { PageShell } from "@/components/page-shell";

export default function TrainingPage() {
  return (
    <PageShell narrow>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Formazione
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Moduli e quiz
      </h1>
      <p className="mt-3 text-muted-foreground">
        Obbligatori prima di andare online. Divieto assoluto di contatti
        off-platform.
      </p>
      <div className="mt-10">
        <ListenerTraining />
      </div>
    </PageShell>
  );
}
