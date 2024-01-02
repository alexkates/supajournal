import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import { Input } from "./ui/input";
import { revalidatePath } from "next/cache";

type Props = {
  journalId: string;
  initialName: string;
};

function JournalNameForm({ journalId, initialName }: Props) {
  async function updateName(formData: FormData) {
    "use server";

    const supabase = createServerActionClient({ cookies });

    const name = formData.get("name") as string;

    await supabase.from("JournalEntry").update({ name }).eq("id", journalId);

    revalidatePath(`/journal/${journalId}`);
  }

  return (
    <form action={updateName}>
      <Input name="name" type="text" defaultValue={initialName} className="" />
    </form>
  );
}

export default JournalNameForm;
