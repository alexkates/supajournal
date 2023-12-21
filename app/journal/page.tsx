import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/supabase/types";
import calculateStreak from "@/lib/get-streak-stats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookHeart, CalendarClock, GanttChartSquare, LucidePencil, PenBoxIcon, Tally5, WholeWord } from "lucide-react";
import calculateWordCountStats from "@/lib/get-word-count-stats";
import calculateJournalEntriesStats from "@/lib/get-journal-entry-stats";
import calculateWordsPerJournalEntryStats from "@/lib/get-words-per-journal-entry-stats";
import calculateMostRecentEntryStats from "@/lib/get-most-recent-entry-stats";
import JournalEntryList from "@/components/journal-entry-list";
import createJournalEntry from "./_actions/createJournalEntry";
import { Button } from "@/components/ui/button";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: journalEntries } = await supabase
    .from("JournalEntry")
    .select("wordCount, createdAt, mostPopularWord, mostPopularWordCount, id, name");

  if (!journalEntries) return null;

  const { totalJournalEntries, jouralEntriesSymbol, journalEntriesDifferenceSinceLastMonth } = calculateJournalEntriesStats(journalEntries);
  const { totalWordCount, wordCountSymbol, wordCountDifferenceSinceLastMonth, mostPopularWord, mostPopularWordCount } =
    calculateWordCountStats(journalEntries);
  const { wordsPerEntry, wordsPerJournalEntrySymbol, wordsPerEntryDifferenceSinceLastMonth } = calculateWordsPerJournalEntryStats(journalEntries);
  const { streak } = calculateStreak(journalEntries);
  const { daysSinceLastEntry, mostRecentEntryDate } = calculateMostRecentEntryStats(journalEntries);

  return (
    <>
      <main className="flex w-full flex-col p-2 sm:hidden">
        <form action={createJournalEntry} className="fixed bottom-6 right-6">
          <Button size={"icon"} className="h-16 w-16 rounded-full">
            <PenBoxIcon className="h-6 w-6" />
          </Button>
        </form>
        <JournalEntryList journalEntries={journalEntries} />
      </main>
      <main className="container hidden flex-col space-y-4 py-8 sm:flex">
        <div className="flex flex-col items-start">
          <h1 className="text-3xl font-bold">Writing Stats</h1>
          <p className="text-xs text-muted-foreground">Let's see how you're doing!</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              <CardTitle className="text-sm font-medium">Most Popular Word</CardTitle>
              <Tally5 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mostPopularWord || `N/A`}</div>
              <p className="text-xs text-muted-foreground">{`${mostPopularWordCount} uses across journal entries`}</p>
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
              <div className="text-2xl font-bold">{mostRecentEntryDate?.toLocaleDateString() ?? "N/A"}</div>
              <p className="text-xs text-muted-foreground">{`${daysSinceLastEntry} days since last entry`}</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
