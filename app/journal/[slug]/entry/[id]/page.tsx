import JournalEntryEditor from "@/components/JournalEntryEditor";

export default function Page({
  params,
}: {
  params: { slug: string; id: string };
}) {
  return (
    <div>
      My Journal: {params.slug} entry: {params.id}
      <JournalEntryEditor />
    </div>
  );
}
