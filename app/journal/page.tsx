import createSupabaseClient from "@/supabase/client";
import Link from "next/link";
import createJournal from "./_actions/createJournal";

export default async function Page() {
  const supabase = createSupabaseClient("ServerComponentClient");

  const { data: journals, error } = await supabase.from("journal").select("*");

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

      <form action={createJournal}>
        <input name="name" placeholder="name" />
        <input name="description" placeholder="description" />

        <button type="submit">Add Journal</button>
      </form>
    </main>
  );
}
