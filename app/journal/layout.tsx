import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import { Database } from "@/supabase/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import createJournalEntry from "./_actions/createJournalEntry";
import { Button } from "@/components/ui/button";
import { PenBoxIcon } from "lucide-react";
import AvatarMenu from "@/components/avatar-menu";
import JournalEntryList from "@/components/journal-entry-list";

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
    <div className="h-screen flex">
      <aside id="sidebar" className="h-screen w-auto py-8 px-2 sm:px-6 border-r border-r-slate-500 " aria-label="Sidebar">
        <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden px-4">
          <div className="flex flex-col w-full space-y-8">
            <div className="flex justify-between items-center">
              <Button asChild variant={"ghost"}>
                <Link href="/journal">
                  <span className="font-bold text-xl">Supajournal</span>
                </Link>
              </Button>
              <ThemeModeToggle />
            </div>
            <form action={createJournalEntry} className="flex justify-center">
              <Button variant={"default"}>
                <PenBoxIcon className="w-4 h-4 mr-2" />
                Create Journal Entry
              </Button>
            </form>
            <JournalEntryList journalEntries={journalEntries} />
          </div>

          <div className="mt-auto flex flex-col">
            <div className="flex w-full justify-center">
              <AvatarMenu email={user?.email!} />
            </div>
          </div>
        </div>
      </aside>
      <div className="w-full h-screen overflow-y-auto">{children}</div>
    </div>
  );
}
