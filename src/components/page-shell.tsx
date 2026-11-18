import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

type PageShellProps = {
  children: React.ReactNode;
  narrow?: boolean;
};

export function PageShell({ children, narrow }: PageShellProps) {
  return (
    <>
      <SiteHeader variant="plain" />
      <main className="flex-1 mesh-bg">
        <div
          className={`mx-auto px-5 py-12 sm:px-8 sm:py-16 ${
            narrow ? "max-w-xl" : "max-w-6xl"
          }`}
        >
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
