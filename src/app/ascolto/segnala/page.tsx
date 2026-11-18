import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function ReportPage() {
  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Segnala
      </h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        Abuso, spinta off-platform, no-show, qualità tecnica o altro. In MVP la
        segnalazione è UI-only; la review ops arriverà dopo.
      </p>
      <Link href="/aiuto/emergenza" className="mt-6 inline-flex font-semibold text-destructive underline">
        Se è un&apos;emergenza
      </Link>
    </PageShell>
  );
}
