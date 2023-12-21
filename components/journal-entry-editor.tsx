"use client";

import { Database, Tables } from "@/supabase/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Editor } from "novel";
import { JSONContent } from "@tiptap/core";
import { countWords, getMostPopularWordAndCount } from "@/lib/count-words";

type Props = {
  journalEntry: Tables<"JournalEntry">;
};

export default function JournalEntryEditor({ journalEntry }: Props) {
  async function handleJournalEntryUpdated(content: JSONContent) {
    const supabase = createClientComponentClient<Database>();

    const wordCount = countWords(content);
    const [mostPopularWord, mostPopularWordCount] = getMostPopularWordAndCount(content);

    return await supabase.from("JournalEntry").update({ content, wordCount, mostPopularWord, mostPopularWordCount }).eq("id", journalEntry.id);
  }

  return (
    <Editor
      className="h-full w-full"
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
