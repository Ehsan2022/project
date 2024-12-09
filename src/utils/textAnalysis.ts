import { patterns } from './patterns/commonPatterns';
import { advancedPatterns } from './patterns/advancedPatterns';
import { analyzeSentences, type SentenceMetrics } from './analysis/sentenceAnalysis';
import { analyzeWordFrequency, type WordFrequencyMetrics } from './analysis/wordFrequency';
import { extractTextFeatures } from './ml/transformers';
import { extractFeatures } from './ml/featureExtractor';
import { predictProbability } from './ml/modelEnsemble';

export interface AnalysisResult {
  score: number;
  indicators: string[];
  metrics: {
    sentence: SentenceMetrics;
    wordFrequency: WordFrequencyMetrics;
  };
}

export function analyzeText(text: string): AnalysisResult {
  const indicators: string[] = [];

  // Extract all features
  const textFeatures = extractTextFeatures(text);
  const sentenceMetrics = analyzeSentences(text);
  const wordFrequencyMetrics = analyzeWordFrequency(text);
  
  // Combine features for advanced analysis
  const features = extractFeatures(
    text,
    textFeatures,
    wordFrequencyMetrics,
    sentenceMetrics
  );

  // Calculate probability using ensemble model
  const score = predictProbability(features);

  // Generate indicators based on comprehensive analysis
  const addIndicator = (pattern: RegExp, threshold: number, message: string) => {
    const matches = (text.match(pattern) || []).length;
    if (matches / textFeatures.wordCount > threshold) {
      indicators.push(message);
    }
  };

  // Check basic patterns
  addIndicator(patterns.repetitiveStructures, 0.05, "Repetitive transition words");
  addIndicator(patterns.genericPhrasing, 0.05, "Generic academic phrases");
  addIndicator(patterns.formalityLevel, 0.06, "Overly formal language");
  addIndicator(patterns.perfectGrammar, 0.07, "Unusually perfect grammar");
  addIndicator(patterns.redundantPhrasing, 0.04, "Redundant phrases");
  addIndicator(patterns.overlyPrecise, 0.03, "Overly precise numbers");
  addIndicator(patterns.academicCitations, 0.03, "Frequent citations");

  // Check advanced patterns
  addIndicator(advancedPatterns.passiveVoice, 0.08, "Excessive passive voice");
  addIndicator(advancedPatterns.listPatterns, 0.06, "Mechanical list structures");
  addIndicator(advancedPatterns.hedging, 0.07, "Frequent hedging language");
  addIndicator(advancedPatterns.formulaic, 0.05, "Formulaic expressions");
  addIndicator(advancedPatterns.intensifiers, 0.06, "Overuse of intensifiers");
  addIndicator(advancedPatterns.mechanicalTransitions, 0.05, "Mechanical transitions");
  addIndicator(advancedPatterns.clarification, 0.04, "Excessive clarifications");

  // Add statistical indicators
  if (features.textFeatures.uniqueWords / features.textFeatures.wordCount < 0.4) {
    indicators.push("Limited vocabulary range");
  }
  if (sentenceMetrics.variance < 5) {
    indicators.push("Uniform sentence structure");
  }
  if (sentenceMetrics.complexity > 2) {
    indicators.push("Consistently complex sentences");
  }

  return {
    score,
    indicators,
    metrics: {
      sentence: sentenceMetrics,
      wordFrequency: wordFrequencyMetrics
    }
  };
}