export interface TextFeatures {
  wordCount: number;
  charCount: number;
  avgWordLength: number;
  uniqueWords: number;
  sentenceCount: number;
  avgSentenceLength: number;
  punctuationDensity: number;
}

export function extractTextFeatures(text: string): TextFeatures {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const uniqueWords = new Set(words);
  const punctuationCount = (text.match(/[.,!?;:]/g) || []).length;

  return {
    wordCount: words.length,
    charCount: text.length,
    avgWordLength: words.reduce((sum, word) => sum + word.length, 0) / words.length,
    uniqueWords: uniqueWords.size,
    sentenceCount: sentences.length,
    avgSentenceLength: words.length / sentences.length,
    punctuationDensity: punctuationCount / words.length
  };
}