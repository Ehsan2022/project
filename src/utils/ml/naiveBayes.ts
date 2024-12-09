export interface Features {
  repetitiveCount: number;
  genericCount: number;
  formalityCount: number;
  perfectGrammarCount: number;
  redundantCount: number;
  overlyPreciseCount: number;
  citationCount: number;
  uniqueWordRatio: number;
  avgWordLength: number;
  uncommonWordRatio: number;
  sentenceVariance: number;
  sentenceComplexity: number;
}

// Simple Naive Bayes implementation
export function calculateProbability(features: Features): number {
  // These weights are based on empirical observations
  const weights = {
    repetitiveCount: 0.15,
    genericCount: 0.12,
    formalityCount: 0.1,
    perfectGrammarCount: 0.08,
    redundantCount: 0.1,
    overlyPreciseCount: 0.05,
    citationCount: 0.05,
    uniqueWordRatio: -0.1, // Negative because higher ratio suggests human writing
    avgWordLength: 0.08,
    uncommonWordRatio: -0.07,
    sentenceVariance: -0.1,
    sentenceComplexity: 0.1
  };

  // Calculate weighted sum
  let score = Object.entries(features).reduce((sum, [key, value]) => {
    return sum + (value * weights[key as keyof typeof weights]);
  }, 0);

  // Normalize to 0-1 range using sigmoid function
  return 1 / (1 + Math.exp(-score));
}