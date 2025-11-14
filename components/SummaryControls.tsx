
import React from 'react';
import type { SummaryLength } from '../types';

interface SummaryControlsProps {
  onGenerateSummary: (length: SummaryLength) => void;
  isDisabled: boolean;
}

export const SummaryControls: React.FC<SummaryControlsProps> = ({
  onGenerateSummary,
  isDisabled,
}) => {
  const buttonBaseClasses = "inline-flex w-full sm:w-auto justify-center items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed transition-colors";
  
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
      <button
        type="button"
        onClick={() => onGenerateSummary('short')}
        disabled={isDisabled}
        className={`${buttonBaseClasses} bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300`}
      >
        Short
        <span className="hidden md:inline ml-1.5 opacity-80">(~50-80 words)</span>
      </button>
      <button
        type="button"
        onClick={() => onGenerateSummary('medium')}
        disabled={isDisabled}
        className={`${buttonBaseClasses} bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300`}
      >
        Medium
         <span className="hidden md:inline ml-1.5 opacity-80">(~120-150 words)</span>
      </button>
      <button
        type="button"
        onClick={() => onGenerateSummary('long')}
        disabled={isDisabled}
        className={`${buttonBaseClasses} bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300`}
      >
        Long
        <span className="hidden md:inline ml-1.5 opacity-80">(~200-250 words)</span>
      </button>
    </div>
  );
};
