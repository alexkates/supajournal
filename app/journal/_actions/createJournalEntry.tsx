"use server";

import createSupabaseClient from "@/supabase/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createJournalEntry(formData: FormData) {
  const supabase = createSupabaseClient("ServerActionClient");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = formData.get("name") as string;
  const user_id = user?.id!;

  const { data: newJournalEntry } = await supabase.from("journal_entry").insert({ name, user_id }).select("id").single();

  revalidatePath("/");
  redirect(`/journal/${newJournalEntry?.id}`);
}
