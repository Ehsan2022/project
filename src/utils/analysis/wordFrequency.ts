export interface WordFrequencyMetrics {
  uniqueWordRatio: number;
  avgWordLength: number;
  uncommonWordRatio: number;
}

// Common English words to filter out
const commonWords = new Set(['the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at']);

export function analyzeWordFrequency(text: string): WordFrequencyMetrics {
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFreq = new Map<string, number>();
  
  words.forEach(word => {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
  });

  const uniqueWords = wordFreq.size;
  const totalWords = words.length;
  const uniqueWordRatio = uniqueWords / totalWords;
  
  const avgWordLength = words.reduce((sum, word) => sum + word.length, 0) / totalWords;
  
  const uncommonWords = words.filter(word => !commonWords.has(word));
  const uncommonWordRatio = uncommonWords.length / totalWords;

  return {
    uniqueWordRatio,
    avgWordLength,
    uncommonWordRatio
  };
}