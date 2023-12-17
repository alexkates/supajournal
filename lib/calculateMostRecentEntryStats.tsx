export default function calculateMostRecentEntryStats(data: { createdAt: string; wordCount: number }[]) {
  const mostRecentEntry = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  const mostRecentEntryDate = new Date(mostRecentEntry.createdAt);
  const now = new Date();
  const daysSinceLastEntry = Math.round((now.getTime() - mostRecentEntryDate.getTime()) / (1000 * 60 * 60 * 24));

  return { mostRecentEntryDate, daysSinceLastEntry };
}
