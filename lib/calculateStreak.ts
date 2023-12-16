export default function calculateStreak(data: { createdAt: string; wordCount: number }[]): number {
  data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  let streak = 0;
  let currentDate = new Date();

  for (const entry of data) {
    const entryDate = new Date(entry.createdAt);

    if (entryDate.toDateString() === currentDate.toDateString()) {
      if (entry.wordCount > 0) {
        streak++;
      } else {
        break;
      }
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
