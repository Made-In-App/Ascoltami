import { Phone } from "lucide-react";
import { callHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type CallButtonProps = {
  className?: string;
  showNumber?: boolean;
  tone?: "dark" | "light";
};

export function CallButton({
  className,
  showNumber = true,
  tone = "dark",
}: CallButtonProps) {
  const href = callHref();
  const classes = cn(
    "group inline-flex h-14 items-center gap-3 rounded-2xl px-6 text-[0.95rem] font-semibold tracking-tight transition-all duration-300",
    tone === "dark"
      ? "bg-signal text-ink shadow-[0_18px_40px_-18px_oklch(0.75_0.16_115/0.8)] hover:-translate-y-0.5 hover:brightness-105"
      : "bg-foam text-ink shadow-[0_18px_40px_-18px_oklch(1_0_0/0.45)] hover:-translate-y-0.5 hover:bg-white",
    className
  );

  const label = showNumber
    ? `Chiama gratis · ${site.phoneDisplay}`
    : "Chiama gratis";

  if (!href) {
    return (
      <span className={cn(classes, "cursor-not-allowed opacity-70")} aria-disabled>
        <Phone className="size-4 opacity-80" aria-hidden />
        Numero in arrivo — a breve
      </span>
    );
  }

  return (
    <a href={href} className={classes}>
      <span className="relative flex size-8 items-center justify-center rounded-xl bg-ink/10 transition group-hover:bg-ink/15">
        <Phone className="size-4" aria-hidden />
        <span className="absolute inset-0 animate-soft-pulse rounded-xl bg-ink/10" aria-hidden />
      </span>
      {label}
    </a>
  );
}
