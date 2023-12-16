"use client";

import { Database, Tables } from "@/supabase/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Editor } from "novel";
import { JSONContent } from "@tiptap/core";
import countWords from "@/lib/countWords";

type Props = {
  journalEntry: Tables<"JournalEntry">;
};

export default function JournalEntryEditor({ journalEntry }: Props) {
  async function handleJournalEntryUpdated(content: JSONContent) {
    const supabase = createClientComponentClient<Database>();

    const wordCount = countWords(content);

    return supabase.from("JournalEntry").update({ content, wordCount }).eq("id", journalEntry.id);
  }

  return (
    <Editor
      className="w-full h-full"
      defaultValue={journalEntry.content as JSONContent}
      disableLocalStorage
      completionApi="/api/completion"
      onDebouncedUpdate={(editor) => {
        const json = editor?.getJSON();
        if (json) {
          handleJournalEntryUpdated(json);
        }
      }}
    />
  );
}
