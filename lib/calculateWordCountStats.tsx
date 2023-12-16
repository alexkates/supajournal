export function calculateWordCountStats(data: { wordCount: number; createdAt: string }[]) {
  const totalWordCount = data.reduce((acc, { wordCount }) => acc + wordCount, 0);
  const wordCountLastMonth = data
    .filter(({ createdAt }) => {
      const date = new Date(createdAt);
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      return date > lastMonth && date < firstDayOfMonth;
    })
    .reduce((acc, { wordCount }) => acc + wordCount, 0);

  const wordCountThisMonth = data
    .filter(({ createdAt }) => {
      const date = new Date(createdAt);
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      return date > firstDayOfMonth;
    })
    .reduce((acc, { wordCount }) => acc + wordCount, 0);

  const wordCountDifferenceSinceLastMonth = wordCountThisMonth - wordCountLastMonth;
  const wordCountSymbol = wordCountDifferenceSinceLastMonth > 0 ? "+" : wordCountDifferenceSinceLastMonth < 0 ? "-" : "";
  return { totalWordCount, wordCountSymbol, wordCountDifferenceSinceLastMonth };
}
