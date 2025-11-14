
import React, { useState, useCallback } from 'react';
import { FileUpload } from './components/FileUpload';
import { SummaryControls } from './components/SummaryControls';
import { SummaryDisplay } from './components/SummaryDisplay';
import { Loader } from './components/Loader';
import { ErrorMessage } from './components/ErrorMessage';
import { extractText, generateSummary } from './services/geminiService';
import type { SummaryLength, SummaryOutput } from './types';
import { LogoIcon } from './components/icons/LogoIcon';
import { Chatbot } from './components/Chatbot';

const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [summary, setSummary] = useState<SummaryOutput | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const resetState = () => {
    setSelectedFile(null);
    setExtractedText('');
    setSummary(null);
    setError(null);
    setIsLoading(false);
    setLoadingMessage('');
  };

  const handleFileSelect = useCallback(async (file: File) => {
    resetState();
    setSelectedFile(file);
    setIsLoading(true);
    setLoadingMessage('Extracting text from document...');
    setError(null);

    try {
      const text = await extractText(file);
      setExtractedText(text);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during text extraction.';
      setError(`Failed to extract text. ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  const handleGenerateSummary = useCallback(async (length: SummaryLength) => {
    if (!extractedText) {
      setError('Cannot generate summary without extracted text.');
      return;
    }
    setIsLoading(true);
    setLoadingMessage('Generating your smart summary...');
    setError(null);
    setSummary(null);

    try {
      const result = await generateSummary(extractedText, length);
      setSummary(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during summary generation.';
      setError(`Failed to generate summary. ${errorMessage}`);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, [extractedText]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <LogoIcon className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Document Summary Assistant</h1>
          </div>
          <p className="text-lg text-slate-600">Upload a PDF or image, and let AI create a perfect summary for you.</p>
        </header>

        <main className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold mb-4 text-slate-800">1. Upload Your Document</h2>
            <FileUpload onFileSelect={handleFileSelect} disabled={isLoading} />
          </div>

          {error && <ErrorMessage message={error} />}
          
          {isLoading && <Loader message={loadingMessage} />}

          {extractedText && !isLoading && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-opacity duration-500 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 text-slate-800">2. Review Extracted Text &amp; Generate Summary</h2>
              <div className="relative mb-4">
                <textarea
                  readOnly
                  value={extractedText}
                  className="w-full h-48 p-3 bg-slate-50 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Extracted text will appear here..."
                />
              </div>
              <SummaryControls
                onGenerateSummary={handleGenerateSummary}
                isDisabled={isLoading || !extractedText}
              />
            </div>
          )}

          {summary && !isLoading && (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 transition-opacity duration-500 animate-fade-in">
               <h2 className="text-xl font-semibold mb-4 text-slate-800">3. Your Generated Summary</h2>
              <SummaryDisplay summaryOutput={summary} />
            </div>
          )}
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default App;
