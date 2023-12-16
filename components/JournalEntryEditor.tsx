"use client";

import { Database, Tables } from "@/supabase/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Editor } from "novel";
import { JSONContent } from "@tiptap/core";

type Props = {
  journalEntry: Tables<"journal_entry">;
};

export default function JournalEntryEditor({ journalEntry }: Props) {
  async function handleJournalEntryUpdated(content: JSONContent) {
    const supabase = createClientComponentClient<Database>();

    const firstHeading = content.content?.find((node) => node.type === "heading" && node.attrs?.level === 1);
    const firstHeadingText = firstHeading?.content?.[0];

    const name = firstHeadingText?.text ?? journalEntry.name;

    return supabase.from("journal_entry").update({ content, name }).eq("id", journalEntry.id);
  }

  return (
    <Editor
      className="w-full h-full"
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
