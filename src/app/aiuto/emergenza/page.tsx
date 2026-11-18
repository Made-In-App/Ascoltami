import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function EmergencyPage() {
  return (
    <PageShell narrow>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-destructive">
        Emergenza
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Serve aiuto immediato?
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        Ascoltami non gestisce crisi. Se sei in pericolo o pensi di farti del
        male, contatta subito i servizi di emergenza.
      </p>
      <div className="mt-8 space-y-3 text-lg">
        <p>
          Italia / Europa:{" "}
          <a href="tel:112" className="font-semibold text-tide underline">
            112
          </a>
        </p>
        <p>
          Telefono Amico:{" "}
          <a href="tel:02-2327-2327" className="font-semibold text-tide underline">
            02 2327 2327
          </a>
        </p>
      </div>
      <Link href="/" className="mt-10 inline-flex font-semibold text-ink underline">
        Torna ad Ascoltami
      </Link>
    </PageShell>
  );
}
