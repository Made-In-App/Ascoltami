import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { formatEur, LISTENER_PAYOUT_EUR } from "@/lib/pricing";

const ROWS = [
  {
    id: "#demo-128",
    label: "completata",
    amount: LISTENER_PAYOUT_EUR,
    status: "in elaborazione",
  },
  {
    id: "#demo-121",
    label: "no-show Speaker",
    amount: LISTENER_PAYOUT_EUR / 2,
    status: "esempio",
  },
];

export default function EarningsPage() {
  return (
    <PageShell narrow>
      <h1 className="font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Guadagni
      </h1>
      <p className="mt-3 text-muted-foreground">
        Payout fisso {formatEur(LISTENER_PAYOUT_EUR)} / sessione umana
        completata. Dati demo MVP.
      </p>
      <ul className="mt-10 space-y-4 border-t border-ink/10 pt-6">
        {ROWS.map((row) => (
          <li key={row.id} className="flex items-baseline justify-between gap-4 text-sm">
            <div>
              <p className="font-medium">{row.id}</p>
              <p className="text-muted-foreground">
                {row.label} · {row.status}
              </p>
            </div>
            <p className="font-semibold">+{formatEur(row.amount)}</p>
          </li>
        ))}
      </ul>
      <Link
        href="/ascoltatore/payout-dati"
        className="mt-8 inline-flex font-semibold text-tide underline"
      >
        Completa dati fiscali
      </Link>
    </PageShell>
  );
}
