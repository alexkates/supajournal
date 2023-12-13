"use server";

import createSupabaseClient from "@/supabase/client";
import { revalidatePath } from "next/cache";

export default async function createJournal(formData: FormData) {
  const supabase = createSupabaseClient("ServerActionClient");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const user_id = user?.id!;

  await supabase.from("journal").insert({ name, description, user_id });

  revalidatePath("/");
}
