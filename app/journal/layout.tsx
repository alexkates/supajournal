import { Database } from "@/supabase/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import createJournalEntry from "./_actions/createJournalEntry";
import { Button } from "@/components/ui/button";
import { PenBoxIcon } from "lucide-react";
import JournalEntryList from "@/components/journal-entry-list";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function JournalLayout({ children }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: journalEntries } = await supabase.from("JournalEntry").select("id, name").order("updatedAt", { ascending: false });

  return (
    <div className="flex">
      <aside id="sidebar" className="w-auto py-8 px-2" aria-label="Sidebar">
        <div className="flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex flex-col w-full space-y-8">
            <form action={createJournalEntry} className="flex">
              <Button variant={"default"}>
                <PenBoxIcon className="w-4 h-4 mr-2" />
                Create Journal Entry
              </Button>
            </form>
            <JournalEntryList journalEntries={journalEntries} />
          </div>
        </div>
      </aside>
      <div className="w-full overflow-y-auto">{children}</div>
    </div>
  );
}
