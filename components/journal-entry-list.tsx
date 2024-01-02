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
    <ul className="flex list-none flex-col gap-y-4 md:gap-y-2 ">
      {journalEntries?.map((journalEntry) => {
        const journalName = journalEntry.name.length > 40 ? `${journalEntry.name.substring(0, 40)}...` : journalEntry.name;
        const isActive = pathname.includes(journalEntry.id);

        return (
          <li key={journalEntry.id}>
            <Button
              asChild
              variant={"link"}
              className={cn("w-full justify-start text-neutral-300 hover:text-white hover:underline", isActive && "underline")}
            >
              <Link href={`/journal/${journalEntry.id}`}>
                <span className="text-md md:text-xs">{journalName}</span>
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
