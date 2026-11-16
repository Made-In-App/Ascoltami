import { callHref, site } from "@/lib/site";

export function SiteHeader() {
  const href = callHref();

  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a
          href="#inizio"
          className="font-[family-name:var(--font-heading)] text-xl font-semibold tracking-tight text-foam sm:text-2xl"
        >
          {site.brand}
        </a>
        <nav className="flex items-center gap-5 text-sm text-foam/85">
          <a href="#come-funziona" className="hidden hover:text-foam sm:inline">
            Come funziona
          </a>
          <a href="#temi" className="hidden hover:text-foam sm:inline">
            Di cosa parliamo
          </a>
          {href ? (
            <a
              href={href}
              className="rounded-full bg-foam/15 px-3.5 py-1.5 font-medium text-foam backdrop-blur-sm transition hover:bg-foam/25"
            >
              Chiama
            </a>
          ) : (
            <span className="rounded-full bg-foam/10 px-3.5 py-1.5 text-foam/70">
              Presto online
            </span>
          )}
        </nav>
      </div>
    </header>
  );
}
