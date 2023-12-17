type JournalEntry = {
  createdAt: string;
  wordCount: number;
};

export default function calculateStreak(entries: JournalEntry[]) {
  let streak = 0;
  let currentDate = new Date();

  const entriesDistinctByCreatedAt = entries
    .filter((entry, index, self) => {
      const entryCreatedAtDate = new Date(entry.createdAt);
      const entryCreatedAtDateString = entryCreatedAtDate.toDateString();

      return (
        index ===
        self.findIndex((e) => {
          const eCreatedAtDate = new Date(e.createdAt);
          const eCreatedAtDateString = eCreatedAtDate.toDateString();

          return eCreatedAtDateString === entryCreatedAtDateString;
        })
      );
    })
    .sort((a, b) => {
      const aCreatedAtDate = new Date(a.createdAt);
      const bCreatedAtDate = new Date(b.createdAt);

      return bCreatedAtDate.getTime() - aCreatedAtDate.getTime();
    });

  for (const entry of entriesDistinctByCreatedAt) {
    const entryCreatedAtDate = new Date(entry.createdAt);

    if (entryCreatedAtDate.toDateString() === currentDate.toDateString()) {
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

  return { streak };
}
