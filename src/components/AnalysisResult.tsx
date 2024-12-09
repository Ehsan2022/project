import React from 'react';
import { Bot, AlertTriangle, CheckCircle, BarChart2 } from 'lucide-react';
import type { AnalysisResult } from '../utils/textAnalysis';

interface AnalysisResultProps {
  result: AnalysisResult | null;
}

export function AnalysisResult({ result }: AnalysisResultProps) {
  if (!result) return null;

  const percentage = Math.round(result.score * 100);
  const isLikelyAI = percentage > 70;
  const isMaybe = percentage > 40 && percentage <= 70;

  return (
    <div className="w-full max-w-2xl mt-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-4 mb-4">
          {isLikelyAI ? (
            <Bot className="h-8 w-8 text-red-500" />
          ) : isMaybe ? (
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
          ) : (
            <CheckCircle className="h-8 w-8 text-green-500" />
          )}
          <div>
            <h2 className="text-xl font-semibold">
              {isLikelyAI
                ? 'Likely AI-Generated'
                : isMaybe
                ? 'Possibly AI-Generated'
                : 'Likely Human-Written'}
            </h2>
            <p className="text-gray-600">
              {percentage}% confidence in AI detection
            </p>
          </div>
        </div>

        {result.indicators.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Detected Patterns:
            </h3>
            <ul className="space-y-2">
              {result.indicators.map((indicator, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  {indicator}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart2 className="h-4 w-4 text-gray-500" />
            <h3 className="text-sm font-medium text-gray-700">Detailed Metrics</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Sentence Structure</p>
              <ul className="mt-1 space-y-1">
                <li>Average Length: {result.metrics.sentence.avgLength.toFixed(1)} words</li>
                <li>Variance: {result.metrics.sentence.variance.toFixed(1)}</li>
                <li>Complexity: {result.metrics.sentence.complexity.toFixed(2)}</li>
              </ul>
            </div>
            <div>
              <p className="text-gray-600">Word Usage</p>
              <ul className="mt-1 space-y-1">
                <li>Unique Words: {(result.metrics.wordFrequency.uniqueWordRatio * 100).toFixed(1)}%</li>
                <li>Avg Word Length: {result.metrics.wordFrequency.avgWordLength.toFixed(1)}</li>
                <li>Uncommon Words: {(result.metrics.wordFrequency.uncommonWordRatio * 100).toFixed(1)}%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}