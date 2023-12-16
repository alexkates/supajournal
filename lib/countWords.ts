import { JSONContent } from "@tiptap/core";

export default function countWords(doc: JSONContent): number {
  let wordCount = 0;

  function processContent(content: JSONContent[]) {
    content.forEach((item) => {
      if (item.text) {
        wordCount += item.text.split(/\s+/).filter(Boolean).length;
      }
      if (item.content) {
        processContent(item.content);
      }
    });
  }

  if (!doc.content) {
    return wordCount;
  }

  processContent(doc.content);
  return wordCount;
}
