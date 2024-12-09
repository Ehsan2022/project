import type { ExtendedFeatures } from './featureExtractor';

interface ModelWeights {
  textStats: number;
  patterns: number;
  wordFreq: number;
  sentenceMetrics: number;
}

const weights: ModelWeights = {
  textStats: 0.3,
  patterns: 0.3,
  wordFreq: 0.2,
  sentenceMetrics: 0.2
};

function calculateTextStatsScore(features: ExtendedFeatures): number {
  const { textFeatures } = features;
  
  // Normalize and combine text statistics
  const uniqueWordRatio = textFeatures.uniqueWords / textFeatures.wordCount;
  const avgWordLengthScore = Math.min(textFeatures.avgWordLength / 10, 1);
  const punctuationScore = Math.min(textFeatures.punctuationDensity * 5, 1);
  
  return (uniqueWordRatio + avgWordLengthScore + punctuationScore) / 3;
}

function calculatePatternScore(features: ExtendedFeatures): number {
  // Combine pattern frequencies with weighted importance
  return (
    features.passiveVoiceFreq * 0.15 +
    features.listPatternFreq * 0.15 +
    features.hedgingFreq * 0.1 +
    features.quantifierFreq * 0.1 +
    features.formulaicFreq * 0.15 +
    features.intensifierFreq * 0.1 +
    features.transitionFreq * 0.15 +
    features.clarificationFreq * 0.1
  );
}

function calculateWordFreqScore(features: ExtendedFeatures): number {
  const { wordFrequency } = features;
  return (
    wordFrequency.uniqueWordRatio * 0.4 +
    (1 - wordFrequency.uncommonWordRatio) * 0.3 +
    Math.min(wordFrequency.avgWordLength / 10, 1) * 0.3
  );
}

function calculateSentenceScore(features: ExtendedFeatures): number {
  const { sentenceMetrics } = features;
  return (
    Math.min(sentenceMetrics.variance / 10, 1) * 0.4 +
    Math.min(sentenceMetrics.complexity, 1) * 0.3 +
    Math.min(sentenceMetrics.avgLength / 20, 1) * 0.3
  );
}

export function predictProbability(features: ExtendedFeatures): number {
  const scores = {
    textStats: calculateTextStatsScore(features),
    patterns: calculatePatternScore(features),
    wordFreq: calculateWordFreqScore(features),
    sentenceMetrics: calculateSentenceScore(features)
  };

  // Combine scores using ensemble weights
  const weightedScore = 
    scores.textStats * weights.textStats +
    scores.patterns * weights.patterns +
    scores.wordFreq * weights.wordFreq +
    scores.sentenceMetrics * weights.sentenceMetrics;

  // Apply sigmoid function for final probability
  return 1 / (1 + Math.exp(-10 * (weightedScore - 0.5)));
}