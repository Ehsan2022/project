import { advancedPatterns } from '../patterns/advancedPatterns';
import type { TextFeatures } from './transformers';
import type { WordFrequencyMetrics } from '../analysis/wordFrequency';
import type { SentenceMetrics } from '../analysis/sentenceAnalysis';

export interface ExtendedFeatures {
  // Text statistics
  textFeatures: TextFeatures;
  
  // Pattern frequencies
  passiveVoiceFreq: number;
  listPatternFreq: number;
  hedgingFreq: number;
  quantifierFreq: number;
  formulaicFreq: number;
  intensifierFreq: number;
  transitionFreq: number;
  clarificationFreq: number;
  
  // Existing metrics
  wordFrequency: WordFrequencyMetrics;
  sentenceMetrics: SentenceMetrics;
}

export function extractFeatures(
  text: string,
  textFeatures: TextFeatures,
  wordFrequency: WordFrequencyMetrics,
  sentenceMetrics: SentenceMetrics
): ExtendedFeatures {
  // Calculate pattern frequencies relative to word count
  const wordCount = textFeatures.wordCount;
  
  const getFrequency = (pattern: RegExp): number => {
    const matches = text.match(pattern) || [];
    return matches.length / wordCount;
  };

  return {
    textFeatures,
    passiveVoiceFreq: getFrequency(advancedPatterns.passiveVoice),
    listPatternFreq: getFrequency(advancedPatterns.listPatterns),
    hedgingFreq: getFrequency(advancedPatterns.hedging),
    quantifierFreq: getFrequency(advancedPatterns.quantifiers),
    formulaicFreq: getFrequency(advancedPatterns.formulaic),
    intensifierFreq: getFrequency(advancedPatterns.intensifiers),
    transitionFreq: getFrequency(advancedPatterns.mechanicalTransitions),
    clarificationFreq: getFrequency(advancedPatterns.clarification),
    wordFrequency,
    sentenceMetrics
  };
}