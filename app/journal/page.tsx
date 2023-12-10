import { Database } from "@/supabase/types";
import { createServerActionClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({
    cookies,
  });

  const { data, error } = await supabase.from("journal").select("*");

  const addJournal = async (formData: FormData) => {
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
  };

  return (
    <main>
      <h1>Journals</h1>
      <p>{error?.message}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <form action={addJournal}>
        <input name="name" placeholder="name" />
        <input name="description" placeholder="description" />

        <button type="submit">Add Journal</button>
      </form>
    </main>
  );
}
