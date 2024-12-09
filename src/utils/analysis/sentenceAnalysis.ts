export interface SentenceMetrics {
  avgLength: number;
  variance: number;
  complexity: number;
}

export function analyzeSentences(text: string): SentenceMetrics {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const lengths = sentences.map(s => s.trim().split(/\s+/).length);
  
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((a, b) => a + Math.pow(b - avgLength, 2), 0) / lengths.length;
  
  // Calculate sentence complexity based on comma usage and word length
  const complexity = sentences.reduce((sum, sentence) => {
    const commaCount = (sentence.match(/,/g) || []).length;
    const longWords = (sentence.match(/\b\w{7,}\b/g) || []).length;
    return sum + (commaCount * 0.1) + (longWords * 0.2);
  }, 0) / sentences.length;

  return {
    avgLength,
    variance,
    complexity
  };
}