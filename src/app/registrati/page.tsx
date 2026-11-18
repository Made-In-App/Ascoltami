import { AuthForm } from "@/components/auth-form";
import { PageShell } from "@/components/page-shell";

export default function RegisterPage() {
  return (
    <PageShell narrow>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Account
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Crea account Ascoltami
      </h1>
      <p className="mt-3 text-muted-foreground">
        Scegli se parlare o ascoltare. Nessun numero di telefono: il contatto
        resta solo in Ascoltami.
      </p>
      <div className="mt-10">
        <AuthForm mode="register" />
      </div>
    </PageShell>
  );
}
