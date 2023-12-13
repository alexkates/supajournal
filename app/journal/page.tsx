import createSupabaseClient from "@/supabase/client";
import Link from "next/link";
import createJournal from "./_actions/createJournal";

export default async function Page() {
  const supabase = createSupabaseClient("ServerComponentClient");

  const { data: journals } = await supabase.from("journal").select("*");

  return (
    <main className="flex flex-col gap-8">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {journals?.map((journal) => (
              <tr key={journal.id}>
                <td>
                  <Link className="link link-primary" href={`/journal/${journal.id}`}>
                    {journal.name}
                  </Link>
                </td>
                <td>{journal.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form action={createJournal} className="flex flex-col gap-8">
        <label className="form-control">
          <div className="label">
            <span className="label-text">Journal Name</span>
          </div>
          <input type="text" name="name" placeholder="Daily Journal" className="input input-bordered" />
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <input type="text" name="description" placeholder="Thoughts and reflections on the day" className="input input-bordered" />
        </label>

        <button className="btn btn-primary" type="submit">
          Add Journal
        </button>
      </form>
    </main>
  );
}
