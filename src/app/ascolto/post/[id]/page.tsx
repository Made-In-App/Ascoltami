import { Suspense } from "react";
import { PageShell } from "@/components/page-shell";
import { PostCall } from "@/components/post-call";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function PostContent({ params }: PageProps) {
  const { id } = await params;
  return <PostCall callId={id} role="speaker" />;
}

export default function SpeakerPostPage(props: PageProps) {
  return (
    <PageShell narrow>
      <Suspense fallback={<p className="text-muted-foreground">Caricamento…</p>}>
        <PostContent {...props} />
      </Suspense>
    </PageShell>
  );
}
