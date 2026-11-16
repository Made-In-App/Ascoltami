import { priceLabel, site } from "@/lib/site";

type SiteHeaderProps = {
  variant?: "hero" | "plain";
};

export function SiteHeader({ variant = "hero" }: SiteHeaderProps) {
  const light = variant === "hero";

  return (
    <header className={light ? "absolute inset-x-0 top-0 z-30" : "border-b border-ink/8 bg-foam"}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <a
          href="/"
          className={`font-[family-name:var(--font-heading)] text-lg font-bold tracking-[-0.04em] sm:text-xl ${
            light ? "text-foam" : "text-ink"
          }`}
        >
          {site.brand}
          <span className="ml-1 inline-block size-1.5 translate-y-[-0.35em] rounded-full bg-signal" />
        </a>

        <nav
          className={`flex items-center gap-1 text-sm sm:gap-2 ${
            light ? "text-foam/80" : "text-ink/70"
          }`}
        >
          <a
            href="/#come-funziona"
            className={`hidden rounded-xl px-3 py-2 transition sm:inline ${
              light ? "hover:bg-foam/10 hover:text-foam" : "hover:bg-mist hover:text-ink"
            }`}
          >
            Come funziona
          </a>
          <a
            href="/#temi"
            className={`hidden rounded-xl px-3 py-2 transition sm:inline ${
              light ? "hover:bg-foam/10 hover:text-foam" : "hover:bg-mist hover:text-ink"
            }`}
          >
            Di cosa parliamo
          </a>
          <a
            href="/#chiama"
            className={`ml-1 rounded-xl px-3.5 py-2 font-medium backdrop-blur-md transition ${
              light
                ? "bg-foam/12 text-foam hover:bg-foam/20"
                : "bg-ink text-foam hover:bg-ink/90"
            }`}
          >
            Accedi · {priceLabel()}
          </a>
        </nav>
      </div>
    </header>
  );
}
