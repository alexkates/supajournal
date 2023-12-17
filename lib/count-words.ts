import { JSONContent } from "@tiptap/core";

export function countWords(doc: JSONContent): number {
  const wordCounts = wordsByCount(doc);

  return Object.values(wordCounts).reduce((a, b) => a + b, 0);
}

export function getMostPopularWordAndCount(doc: JSONContent) {
  const wordCounts = wordsByCount(doc);
  const sortedWords = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]);

  return sortedWords[0] || [];
}

function wordsByCount(jsonContent: JSONContent) {
  const words: Record<string, number> = {};

  function processContent(jsonContent: JSONContent) {
    if (jsonContent.text) {
      const wordList = jsonContent.text.toLowerCase().split(/\s+/).filter(Boolean);
      wordList.forEach((word) => {
        words[word] = (words[word] || 0) + 1;
      });
    }
    if (Array.isArray(jsonContent.content)) {
      jsonContent.content.forEach(processContent);
    }
  }

  processContent(jsonContent);

  return words;
}
