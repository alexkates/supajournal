"use client";

import { Tables } from "@/supabase/types";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "@/lib/cn";

type Props = {
  journalEntries: Pick<Tables<"JournalEntry">, "id" | "name">[] | null;
};

export default function JournalEntryList({ journalEntries }: Props) {
  const pathname = usePathname();
  return (
    <ul className="flex list-none flex-col gap-y-2">
      {journalEntries?.map((journalEntry) => {
        const isActive = pathname.includes(journalEntry.id);

        return (
          <li key={journalEntry.id}>
            <Button asChild variant="link" className={cn("w-full justify-start text-black dark:text-white", isActive && "underline")}>
              <Link href={`/journal/${journalEntry.id}`}>
                <span className="w-full truncate text-sm sm:w-52">{journalEntry.name}</span>
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
