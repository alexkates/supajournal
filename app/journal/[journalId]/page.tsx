import JournalEntryEditor from "@/components/journal-entry-editor";
import JournalNameForm from "@/components/journal-name-form";
import { Database } from "@/supabase/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { journalId: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: journalEntry } = await supabase.from("JournalEntry").select("*").eq("id", params.journalId).single();

  if (!journalEntry) {
    notFound();
  }

  return (
    <section className="flex flex-col gap-2">
      <JournalNameForm journalId={journalEntry.id} initialName={journalEntry.name} />
      <JournalEntryEditor journalEntry={journalEntry} />
    </section>
  );
}
