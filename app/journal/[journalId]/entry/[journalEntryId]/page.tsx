import JournalEntryEditor from "@/components/JournalEntryEditor";

export default function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <JournalEntryEditor />
    </main>
  );
}
