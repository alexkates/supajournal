export function calculateWordsPerJournalEntryStats(data: { wordCount: number; createdAt: string }[]) {
  const totalWordCount = data.reduce((acc, { wordCount }) => acc + wordCount, 0);
  const wordsPerEntry = Math.round(totalWordCount / data.length);

  const entriesLastMonth = data.filter(({ createdAt }) => {
    const date = new Date(createdAt);
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return date > lastMonth && date < firstDayOfMonth;
  });

  const wordCountLastMonth = entriesLastMonth.reduce((acc, { wordCount }) => acc + wordCount, 0);
  const wordsPerEntryLastMonth = entriesLastMonth.length === 0 ? 0 : wordCountLastMonth / entriesLastMonth.length;

  const entriesThisMonth = data.filter(({ createdAt }) => {
    const date = new Date(createdAt);
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return date > firstDayOfMonth;
  });

  const wordCountThisMonth = entriesThisMonth.reduce((acc, { wordCount }) => acc + wordCount, 0);
  const averageWordsPerJournalEntryThisMonth = entriesThisMonth.length === 0 ? 0 : wordCountThisMonth / entriesThisMonth.length;

  const wordsPerEntryDifferenceSinceLastMonth = Math.round(averageWordsPerJournalEntryThisMonth - wordsPerEntryLastMonth);

  const wordsPerJournalEntrySymbol = wordsPerEntryDifferenceSinceLastMonth > 0 ? "+" : wordsPerEntryDifferenceSinceLastMonth < 0 ? "-" : "";

  return {
    wordsPerEntry,
    wordsPerJournalEntrySymbol,
    wordsPerEntryDifferenceSinceLastMonth,
  };
}
