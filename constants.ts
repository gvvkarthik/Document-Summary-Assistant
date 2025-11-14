
import type { SummaryLength } from './types';

export const MAX_FILE_SIZE_MB = 10;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export const SUPPORTED_FILE_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
];

export const SUMMARY_LENGTH_CONFIG: Record<SummaryLength, { min: number; max: number }> = {
  short: { min: 50, max: 80 },
  medium: { min: 120, max: 150 },
  long: { min: 200, max: 250 },
};
