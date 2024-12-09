// Common AI text patterns
export const patterns = {
  repetitiveStructures: /(similarly|moreover|furthermore|in addition|additionally|consequently|therefore|thus|hence|as a result)/gi,
  genericPhrasing: /(it is important to note|as we can see|in conclusion|to summarize|it goes without saying|needless to say|it should be noted)/gi,
  formalityLevel: /(utilize|implement|facilitate|leverage|optimize|endeavor|commence|terminate|initiate|demonstrate)/gi,
  perfectGrammar: /[.!?][^\s][A-Z]/g,
  redundantPhrasing: /(absolutely essential|advance planning|basic fundamentals|collaborate together|end result|future plans|past history|unexpected surprise)/gi,
  overlyPrecise: /\b\d+(?:\.\d{2,})?%?\b/g,
  academicCitations: /\([^)]+, \d{4}\)/g,
};