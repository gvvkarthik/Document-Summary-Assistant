
import React from 'react';
import type { SummaryOutput } from '../types';
import { BulletIcon } from './icons/BulletIcon';

interface SummaryDisplayProps {
  summaryOutput: SummaryOutput;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ summaryOutput }) => {
  return (
    <div className="space-y-6 text-slate-700">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Summary</h3>
        <p className="leading-relaxed">{summaryOutput.summary}</p>
      </div>

      {summaryOutput.keyPoints && summaryOutput.keyPoints.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Key Points</h3>
          <ul className="space-y-2">
            {summaryOutput.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start">
                <BulletIcon className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {summaryOutput.mainIdeas && summaryOutput.mainIdeas.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Main Ideas</h3>
          <ul className="space-y-2">
            {summaryOutput.mainIdeas.map((idea, index) => (
              <li key={index} className="flex items-start">
                 <BulletIcon className="h-5 w-5 text-indigo-500 mr-2 mt-1 flex-shrink-0" />
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
