export default function calculateJournalEntriesStats(data: { wordCount: number; createdAt: string }[]) {
  const totalJournalEntries = data.length;
  const journalEntriesLastMonth = data.filter(({ createdAt }) => {
    const date = new Date(createdAt);
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return date > lastMonth && date < firstDayOfMonth;
  }).length;

  const journalEntriesThisMonth = data.filter(({ createdAt }) => {
    const date = new Date(createdAt);
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return date > firstDayOfMonth;
  }).length;

  const journalEntriesDifferenceSinceLastMonth = journalEntriesThisMonth - journalEntriesLastMonth;
  const jouralEntriesSymbol = journalEntriesDifferenceSinceLastMonth > 0 ? "+" : journalEntriesDifferenceSinceLastMonth < 0 ? "-" : "";
  return { totalJournalEntries, jouralEntriesSymbol, journalEntriesDifferenceSinceLastMonth };
}
