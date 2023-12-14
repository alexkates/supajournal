"use server";

import { Database } from "@/supabase/types";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function createJournalEntry(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = formData.get("name") as string;
  const user_id = user?.id!;

  const content = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Today's Journal Entry" }],
      },
    ],
  };

  const { data: newJournalEntry } = await supabase.from("journal_entry").insert({ name, user_id, content }).select("id").single();

  revalidatePath("/");
  redirect(`/journal/${newJournalEntry?.id}`);
}
