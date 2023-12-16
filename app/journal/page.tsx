import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/supabase/types";
import calculateStreak from "@/lib/calculateStreak";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase.from("JournalEntry").select("wordCount, createdAt");

  if (!data) return null;

  const totalJournalEntries = data.length;
  const totalWordCount = data.reduce((acc, { wordCount }) => acc + wordCount, 0);
  const streak = calculateStreak(data);

  return (
    <main className="flex flex-col items-center justify-center w-full h-full">
      <span className="text-4xl font-bold text-center">{totalJournalEntries} journal entries</span>

      <span className="text-4xl font-bold text-center">{totalWordCount} words</span>

      <span className="text-4xl font-bold text-center">{streak} day streak</span>
    </main>
  );
}
