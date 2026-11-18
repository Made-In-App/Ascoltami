import { AuthForm } from "@/components/auth-form";
import { PageShell } from "@/components/page-shell";

export default function LoginPage() {
  return (
    <PageShell narrow>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
        Accesso
      </p>
      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em]">
        Accedi ad Ascoltami
      </h1>
      <div className="mt-10">
        <AuthForm mode="login" />
      </div>
    </PageShell>
  );
}
