import { Database } from "@/supabase/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import JournalEntryList from "@/components/journal-entry-list";
import { Button } from "@/components/ui/button";
import { PenBoxIcon } from "lucide-react";
import createJournalEntry from "./_actions/createJournalEntry";

type Props = {
  children: React.ReactNode;
};

export default async function JournalLayout({ children }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");

  const { data: journalEntries } = await supabase.from("JournalEntry").select("id, name").order("updatedAt", { ascending: false });

  return (
    <div className="flex">
      <aside id="sidebar" className="hidden w-auto px-2 py-8 sm:flex" aria-label="Sidebar">
        <div className="flex flex-col overflow-y-auto overflow-x-hidden">
          <div className="flex w-full flex-col space-y-8">
            <form action={createJournalEntry} className="flex">
              <Button variant={"default"}>
                <PenBoxIcon className="mr-2 h-4 w-4" />
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
