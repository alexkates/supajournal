import createJournalEntry from "./_actions/createJournalEntry";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/supabase/types";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

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
