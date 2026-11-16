import { callHref, site } from "@/lib/site";

export function SiteHeader() {
  const href = callHref();

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <a
          href="#inizio"
          className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-[-0.04em] text-foam sm:text-xl"
        >
          {site.brand}
          <span className="ml-1 inline-block size-1.5 translate-y-[-0.35em] rounded-full bg-signal" />
        </a>

        <nav className="flex items-center gap-1 text-sm text-foam/80 sm:gap-2">
          <a
            href="#come-funziona"
            className="hidden rounded-xl px-3 py-2 transition hover:bg-foam/10 hover:text-foam sm:inline"
          >
            Come funziona
          </a>
          <a
            href="#temi"
            className="hidden rounded-xl px-3 py-2 transition hover:bg-foam/10 hover:text-foam sm:inline"
          >
            Di cosa parliamo
          </a>
          {href ? (
            <a
              href={href}
              className="ml-1 rounded-xl bg-foam/12 px-3.5 py-2 font-medium text-foam backdrop-blur-md transition hover:bg-foam/20"
            >
              Chiama
            </a>
          ) : (
            <span className="ml-1 rounded-xl bg-foam/8 px-3.5 py-2 text-foam/65">
              Presto online
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
