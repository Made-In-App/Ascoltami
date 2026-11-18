import Link from "next/link";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  children: React.ReactNode;
  tone?: "signal" | "foam" | "ink" | "ghost";
  className?: string;
};

export function CtaLink({
  href,
  children,
  tone = "signal",
  className,
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 text-[0.95rem] font-semibold tracking-tight transition-all duration-300 hover:-translate-y-0.5",
        tone === "signal" &&
          "bg-signal text-ink shadow-[0_18px_40px_-18px_oklch(0.75_0.16_115/0.8)] hover:brightness-105",
        tone === "foam" &&
          "bg-foam text-ink shadow-[0_18px_40px_-18px_oklch(1_0_0/0.45)] hover:bg-white",
        tone === "ink" && "bg-ink text-foam hover:bg-ink/90",
        tone === "ghost" &&
          "border border-current/25 bg-transparent hover:bg-current/5",
        className
      )}
    >
      {children}
    </Link>
  );
}
