import { AccessResult } from "@/components/access-result";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export default function AccessoPage() {
  return (
    <>
      <SiteHeader variant="plain" />
      <main className="flex-1 bg-mist/40 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-tide">
            Accesso
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-heading)] text-4xl font-bold tracking-[-0.04em] text-ink sm:text-5xl">
            Grazie
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Se il pagamento è andato a buon fine, qui sotto trovi il numero per
            chiamarmi durante gli orari indicati.
          </p>

          <div className="mt-10">
            <AccessResult />
          </div>

          <p className="mt-10 text-sm text-muted-foreground">{site.about}</p>
        </div>
      </main>
    </>
  );
}
