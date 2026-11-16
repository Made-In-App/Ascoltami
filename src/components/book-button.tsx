import { Mail } from "lucide-react";
import { bookHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type BookButtonProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function BookButton({ className, tone = "dark" }: BookButtonProps) {
  const classes = cn(
    "group inline-flex h-14 items-center gap-3 rounded-2xl px-6 text-[0.95rem] font-semibold tracking-tight transition-all duration-300",
    tone === "dark"
      ? "bg-signal text-ink shadow-[0_18px_40px_-18px_oklch(0.75_0.16_115/0.8)] hover:-translate-y-0.5 hover:brightness-105"
      : "bg-foam text-ink shadow-[0_18px_40px_-18px_oklch(1_0_0/0.45)] hover:-translate-y-0.5 hover:bg-white",
    className
  );

  return (
    <a href={bookHref()} className={classes}>
      <span className="relative flex size-8 items-center justify-center rounded-xl bg-ink/10 transition group-hover:bg-ink/15">
        <Mail className="size-4" aria-hidden />
        <span className="absolute inset-0 animate-soft-pulse rounded-xl bg-ink/10" aria-hidden />
      </span>
      Prenota · {site.email}
    </a>
  );
}
