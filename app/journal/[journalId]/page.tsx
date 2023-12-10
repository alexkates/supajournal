import { Database } from "@/supabase/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { journalId: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: journal } = await supabase.from("journal").select("*").eq("id", params.journalId).single();

  if (!journal) {
    notFound();
  }

  return <div>My Journal: {journal.name}</div>;
}
