import { Suspense } from "react";
import { CallRoom } from "@/components/call-room";
import { SiteHeader } from "@/components/site-header";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function CallContent({ params }: PageProps) {
  const { id } = await params;
  return <CallRoom callId={id} role="listener" peerLabel="Speaker" />;
}

export default function ListenerCallPage(props: PageProps) {
  return (
    <>
      <SiteHeader variant="plain" />
      <main className="flex-1 mesh-bg">
        <Suspense
          fallback={
            <p className="p-10 text-center text-muted-foreground">
              Apertura room…
            </p>
          }
        >
          <CallContent {...props} />
        </Suspense>
      </main>
    </>
  );
}
