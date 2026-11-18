import { ListenerOnboarding } from "@/components/listener-onboarding";
import { PageShell } from "@/components/page-shell";

export default function ListenerOnboardingPage() {
  return (
    <PageShell narrow>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Listener
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Profilo ascoltatore
      </h1>
      <div className="mt-10">
        <ListenerOnboarding />
      </div>
    </PageShell>
  );
}
