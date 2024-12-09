import React from 'react';
import { AlertCircle } from 'lucide-react';

interface TextInputProps {
  text: string;
  onChange: (text: string) => void;
  isAnalyzing: boolean;
}

export function TextInput({ text, onChange, isAnalyzing }: TextInputProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor="text-input" className="text-sm font-medium text-gray-700">
          Enter text to analyze
        </label>
        <AlertCircle className="h-4 w-4 text-gray-400" />
      </div>
      <textarea
        id="text-input"
        className="w-full h-48 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Paste your text here to check if it might be AI-generated..."
        value={text}
        onChange={(e) => onChange(e.target.value)}
        disabled={isAnalyzing}
      />
    </div>
  );
}