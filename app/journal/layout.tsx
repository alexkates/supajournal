import { ThemeModeToggle } from "@/components/ThemeModeToggle";
import { Database } from "@/supabase/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import createJournalEntry from "./_actions/createJournalEntry";
import { Button } from "@/components/ui/button";
import { PenBoxIcon } from "lucide-react";
import AvatarMenu from "@/components/AvatarMenu";

type Props = {
  children: React.ReactNode;
};

export default async function JournalLayout({ children }: Props) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: journalEntries } = await supabase.from("journal_entry").select("id, name").order("updated_at", { ascending: false });

  return (
    <div className="h-screen flex">
      <aside id="sidebar" className="h-screen w-64 py-8 px-6 border-r border-r-slate-500" aria-label="Sidebar">
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex w-full justify-between my-2 items-center">
            <Button asChild variant={"ghost"}>
              <Link href="/journal">
                <span className="font-bold">Supajournal</span>
              </Link>
            </Button>
            <ThemeModeToggle />
          </div>
          <div className="flex w-full justify-center my-2 items-center">
            <form action={createJournalEntry}>
              <Button variant={"default"}>
                <PenBoxIcon className="w-4 h-4 mr-2" />
                Create Journal Entry
              </Button>
            </form>
          </div>

          <ul>
            {journalEntries?.map((journalEntry) => (
              <li key={journalEntry.id}>
                <Button asChild variant={"ghost"}>
                  <Link href={`/journal/${journalEntry.id}`}>{journalEntry.name}</Link>
                </Button>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-2">
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
