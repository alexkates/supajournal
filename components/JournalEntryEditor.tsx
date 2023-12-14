"use client";

import { Database, Json, Tables } from "@/supabase/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Editor } from "novel";

type Props = {
  journalEntry: Tables<"journal_entry">;
};

export default function JournalEntryEditor({ journalEntry }: Props) {
  async function handleJournalEntryUpdated(content: Json) {
    const supabase = createClientComponentClient<Database>();

    return supabase.from("journal_entry").update({ content }).eq("id", journalEntry.id);
  }

  return (
    <Editor
      defaultValue={journalEntry.content as string}
      disableLocalStorage
      onDebouncedUpdate={(editor) => {
        const json = editor?.getJSON();
        if (json) {
          handleJournalEntryUpdated(json);
        }
      }}
    />
  );
}
