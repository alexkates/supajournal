import createSupabaseClient from "@/supabase/client";
import Link from "next/link";
import createJournalEntry from "./_actions/createJournalEntry";

export default async function Page() {
  const supabase = createSupabaseClient("ServerComponentClient");

  const { data: journalEntries } = await supabase.from("journal_entry").select("*");

  return (
    <main className="flex flex-col gap-8">
      <form action={createJournalEntry} className="flex flex-col gap-8">
        <button className="btn btn-primary" type="submit">
          Create Journal Entry
        </button>
      </form>
    </main>
  );
}
