import { MatchWaiting } from "@/components/match-waiting";
import { PageShell } from "@/components/page-shell";

export default function MatchPage() {
  return (
    <PageShell narrow>
      <MatchWaiting />
    </PageShell>
  );
}
