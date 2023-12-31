export default function calculateWordCountStats(
  data: { wordCount: number; createdAt: string; mostPopularWord: string; mostPopularWordCount: number }[],
) {
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
  const wordCountSymbol = wordCountDifferenceSinceLastMonth > 0 ? "+" : "";

  const allWordsGroupedByOccurrence = data.reduce(
    (acc, { mostPopularWord, mostPopularWordCount }) => {
      if (!acc[mostPopularWord]) {
        acc[mostPopularWord] = 0;
      }
      acc[mostPopularWord] += mostPopularWordCount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const [mostPopularWord, mostPopularWordCount] = Object.entries(allWordsGroupedByOccurrence).reduce(
    ([accWord, accCount], [word, count]) => {
      if (count > accCount) {
        return [word, count];
      }
      return [accWord, accCount];
    },
    ["", 0],
  );

  return { totalWordCount, wordCountSymbol, wordCountDifferenceSinceLastMonth, mostPopularWord, mostPopularWordCount };
}
