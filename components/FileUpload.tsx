
import React, { useState, useCallback } from 'react';
import { MAX_FILE_SIZE_MB, SUPPORTED_FILE_TYPES } from '../constants';
import { UploadIcon } from './icons/UploadIcon';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a PDF, JPG, or PNG.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Max size is ${MAX_FILE_SIZE_MB}MB.`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleFile = useCallback((file: File | undefined) => {
    if (file && validateFile(file)) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const baseClasses = "relative block w-full rounded-lg border-2 border-dashed p-12 text-center transition-colors duration-200";
  const stateClasses = isDragging
    ? 'border-indigo-600 bg-indigo-50'
    : 'border-slate-300 hover:border-indigo-400';
  const disabledClasses = disabled ? 'cursor-not-allowed bg-slate-100 opacity-60' : 'cursor-pointer';

  return (
    <div>
      <label
        htmlFor="file-upload"
        className={`${baseClasses} ${stateClasses} ${disabledClasses}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
        <span className="mt-2 block text-sm font-semibold text-slate-900">
          Drag & drop a file or <span className="text-indigo-600">click to upload</span>
        </span>
        <span className="mt-1 block text-xs text-slate-500">
          PDF, PNG, JPG up to {MAX_FILE_SIZE_MB}MB
        </span>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          accept={SUPPORTED_FILE_TYPES.join(',')}
          onChange={handleFileChange}
          disabled={disabled}
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
