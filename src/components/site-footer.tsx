import Link from "next/link";
import { disclaimers, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/8 bg-mist/50 px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-[-0.04em] text-ink">
              {site.brand}
              <span className="ml-1 inline-block size-1.5 translate-y-[-0.35em] rounded-full bg-signal" />
            </p>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {site.tagline}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <Link href="/come-funziona" className="hover:text-ink">
              Come funziona
            </Link>
            <Link href="/prezzi" className="hover:text-ink">
              Prezzi
            </Link>
            <Link href="/sicurezza" className="hover:text-ink">
              Sicurezza
            </Link>
            <Link href="/aiuto/emergenza" className="hover:text-ink">
              Emergenza
            </Link>
            <Link href="/legale/termini" className="hover:text-ink">
              Termini
            </Link>
            <Link href="/legale/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </nav>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
          {disclaimers.footer} {disclaimers.clinical}
        </p>
      </div>
    </footer>
  );
}
