// Advanced AI text patterns
export const advancedPatterns = {
  // Detects overuse of passive voice
  passiveVoice: /\b(?:am|is|are|was|were|be|been|being)\s+\w+ed\b/gi,
  
  // Detects mechanical list patterns
  listPatterns: /(?:first(?:ly)?|second(?:ly)?|third(?:ly)?|finally|lastly)(?:\s*,|\s+)/gi,
  
  // Detects overuse of hedging language
  hedging: /\b(?:may|might|could|possibly|probably|perhaps|seems|appears|suggests)\b/gi,
  
  // Detects overuse of quantifiers
  quantifiers: /\b(?:many|numerous|several|various|different|multiple|diverse)\b/gi,
  
  // Detects formulaic expressions
  formulaic: /\b(?:in terms of|with respect to|in light of|in regard to|concerning the matter of)\b/gi,
  
  // Detects overuse of intensifiers
  intensifiers: /\b(?:very|extremely|highly|incredibly|remarkably|exceptionally|absolutely)\b/gi,
  
  // Detects mechanical transitions
  mechanicalTransitions: /\b(?:moving on to|turning to|shifting our focus to|looking at|examining)\b/gi,
  
  // Detects overuse of clarification phrases
  clarification: /\b(?:in other words|to put it differently|to clarify|to be more specific|specifically speaking)\b/gi
};