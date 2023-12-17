import { JSONContent } from "@tiptap/core";

export function countWords(doc: JSONContent): number {
  const wordCounts = wordsByCount([doc]);

  return Object.values(wordCounts).reduce((a, b) => a + b, 0);
}

export function getMostPopularWordAndCount(entries: JSONContent[]) {
  console.log(`entries: ${JSON.stringify(entries)}`);
  const wordCounts = wordsByCount(entries);
  console.log(`wordCounts: ${JSON.stringify(wordCounts)}`);
  const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);

  return sortedWords[0];
}

function wordsByCount(entries: JSONContent[]) {
  const words: { [key: string]: number } = {};

  function processContent(contents: JSONContent[]) {
    contents.forEach((entry) => {
      if (entry.text) {
        const wordList = entry.text.toLowerCase().split(/\s+/).filter(Boolean);
        console.log(`wordList: ${JSON.stringify(wordList)}`);
        wordList.forEach((word) => {
          if (words[word]) {
            words[word] += 1;
          } else {
            words[word] = 1;
          }
        });
      }
      if (entry.content) {
        processContent(entry.content);
      }
      console.log(`wordsSoFar: ${JSON.stringify(words)}`);
    });
  }

  processContent(entries);

  console.log(`Final words: ${JSON.stringify(words)}`);

  return words;
}
