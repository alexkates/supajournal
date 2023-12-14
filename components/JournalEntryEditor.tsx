"use client";

import { Database, Tables } from "@/supabase/types";
import { Editor } from "novel";

type Props = {
  journalEntry: Tables<"journal_entry">;
};

export default function JournalEntryEditor({ journalEntry }: Props) {
  return <Editor defaultValue={journalEntry.content as string} />;
}
