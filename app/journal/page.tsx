import createSupabaseClient from "@/supabase/client";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const supabase = createSupabaseClient("ServerComponentClient");

  const { data: journals, error } = await supabase.from("journal").select("*");

  async function addJournal(formData: FormData) {
    "use server";

    const supabase = createServerActionClient({ cookies });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const user_id = user?.id!;

    await supabase.from("journal").insert({ name, description, user_id });

    revalidatePath("/");
  }

  return (
    <main>
      <h1>Journals</h1>
      <p>{error?.message}</p>
      {journals?.map((journal) => (
        <div key={journal.id}>
          <Link href={`/journal/${journal.id}`}>{journal.name}</Link>
          <p>{journal.description}</p>
        </div>
      ))}

      <form action={addJournal}>
        <input name="name" placeholder="name" />
        <input name="description" placeholder="description" />

        <button type="submit">Add Journal</button>
      </form>
    </main>
  );
}
