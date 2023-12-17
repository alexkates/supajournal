import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/supabase/types";
import calculateStreak from "@/lib/calculateStreakStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookHeart, CalendarClock, GanttChartSquare, LucidePencil, WholeWord } from "lucide-react";
import calculateWordCountStats from "@/lib/calculateWordCountStats";
import calculateJournalEntriesStats from "@/lib/calculateJournalEntriesStats";
import calculateWordsPerJournalEntryStats from "@/lib/calculateWordsPerJournalEntryStats";
import calculateMostRecentEntryStats from "@/lib/calculateMostRecentEntryStats";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: journalEntries } = await supabase.from("JournalEntry").select("wordCount, createdAt");

  if (!journalEntries) return null;

  const { totalJournalEntries, jouralEntriesSymbol, journalEntriesDifferenceSinceLastMonth } = calculateJournalEntriesStats(journalEntries);
  const { totalWordCount, wordCountSymbol, wordCountDifferenceSinceLastMonth } = calculateWordCountStats(journalEntries);
  const { wordsPerEntry, wordsPerJournalEntrySymbol, wordsPerEntryDifferenceSinceLastMonth } = calculateWordsPerJournalEntryStats(journalEntries);
  const { streak } = calculateStreak(journalEntries);
  const { daysSinceLastEntry, mostRecentEntryDate } = calculateMostRecentEntryStats(journalEntries);

  return (
    <main className="flex flex-col container py-8">
      <div className="flex">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold">Supajournal</h1>
          <p className="text-xs text-muted-foreground">Your writing stats</p>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Journal Entries</CardTitle>
            <LucidePencil className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalJournalEntries}</div>
            <p className="text-xs text-muted-foreground">{`${jouralEntriesSymbol}${journalEntriesDifferenceSinceLastMonth} from last month`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <GanttChartSquare className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak}</div>
            <p className="text-xs text-muted-foreground">Consecutive days writing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Word Count</CardTitle>
            <WholeWord className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWordCount}</div>
            <p className="text-xs text-muted-foreground">{`${wordCountSymbol}${wordCountDifferenceSinceLastMonth} from last month`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Words Per Journal Entry</CardTitle>
            <BookHeart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{wordsPerEntry}</div>
            <p className="text-xs text-muted-foreground">{`${wordsPerJournalEntrySymbol}${wordsPerEntryDifferenceSinceLastMonth} from last month`}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Recent Entry</CardTitle>
            <CalendarClock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mostRecentEntryDate.toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">{`${daysSinceLastEntry} days since last entry`}</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
