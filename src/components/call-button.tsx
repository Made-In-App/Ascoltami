import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { callHref, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type CallButtonProps = {
  className?: string;
  showNumber?: boolean;
};

export function CallButton({ className, showNumber = true }: CallButtonProps) {
  const href = callHref();
  const classes = cn(
    buttonVariants({ variant: "default", size: "lg" }),
    "h-12 gap-2 rounded-xl px-6 text-base shadow-none",
    className
  );

  if (!href) {
    return (
      <span
        className={cn(classes, "cursor-not-allowed opacity-70")}
        aria-disabled="true"
      >
        <Phone className="size-4" aria-hidden />
        Numero in arrivo — a breve
      </span>
    );
  }

  return (
    <a href={href} className={cn(classes, "transition-transform hover:-translate-y-0.5")}>
      <Phone className="size-4" aria-hidden />
      {showNumber ? `Chiama gratis · ${site.phoneDisplay}` : "Chiama gratis"}
    </a>
  );
}
