import { PageShell } from "@/components/page-shell";
import { SpeakerOnboarding } from "@/components/speaker-onboarding";

export default function SpeakerOnboardingPage() {
  return (
    <PageShell narrow>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Speaker
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Profilo di matching
      </h1>
      <div className="mt-10">
        <SpeakerOnboarding />
      </div>
    </PageShell>
  );
}
