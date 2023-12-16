"use server";

import { Database } from "@/supabase/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OpenAI from "openai";
import { JSONContent } from "@tiptap/core";
import countWords from "@/lib/countWords";

type PromptResponse = {
  prompt: string;
  example: string;
  title: string;
};

export default async function createJournalEntry() {
  const supabase = createServerActionClient<Database>({ cookies });

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const writingPromptPrompt = `Generate a concise and meaningful writing prompt for a journaling app. 
The prompt should be brief and rooted in emotional self-awareness, resilience in adversity,
the beauty of simplicity, or living in harmony with nature.

Return only a JSON object in the following format. The JSON needs to be properly formated so that it can be parsed by the journaling app.
{
  "prompt": "The prompt to be displayed to the user. 1 sentence max.",
  "example": "An example of a journal entry that could be written using this prompt. 1 sentence max.",
  "title": "A creative yet concise title for the journal entry. 40 characters or less."
}
`;

  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    max_tokens: 2000,
    prompt: writingPromptPrompt,
  });

  const prompt = JSON.parse(response.choices[0].text.trim()) as PromptResponse;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = prompt.title;
  const userId = user?.id!;

  const content: JSONContent = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 3 },
        content: [{ type: "text", text: `${prompt.prompt}` }],
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `Example: ${prompt.example}`,
            marks: [
              {
                type: "italic",
              },
            ],
          },
        ],
      },
    ],
  };

  const wordCount = countWords(content);

  const { data: newJournalEntry } = await supabase.from("JournalEntry").insert({ name, userId, content, wordCount }).select("id").single();

  redirect(`/journal/${newJournalEntry?.id}`);
}
