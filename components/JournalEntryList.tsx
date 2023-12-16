"use client";

import { Tables } from "@/supabase/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  journalEntries: Pick<Tables<"journal_entry">, "id" | "name">[] | null;
};

export default function JournalEntryList({ journalEntries }: Props) {
  const pathname = usePathname();
  return (
    <ul className="list-none space-y-2 my-4">
      {journalEntries?.map((journalEntry) => {
        const journalName = journalEntry.name.length > 20 ? `${journalEntry.name.substring(0, 22)}...` : journalEntry.name;
        const isActive = pathname.includes(journalEntry.id);
        const buttonVariant = isActive ? "secondary" : "ghost";

        return (
          <li key={journalEntry.id}>
            <Button asChild variant={buttonVariant} className="w-full justify-start ">
              <Link href={`/journal/${journalEntry.id}`}>{journalName}</Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
