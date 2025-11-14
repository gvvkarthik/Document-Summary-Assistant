
export type SummaryLength = 'short' | 'medium' | 'long';

export interface SummaryOutput {
  summary: string;
  keyPoints: string[];
  mainIdeas: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
