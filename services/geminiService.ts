
import { GoogleGenAI, Type } from "@google/genai";
import type { SummaryLength, SummaryOutput } from '../types';
import { MAX_FILE_SIZE_BYTES, SUPPORTED_FILE_TYPES, SUMMARY_LENGTH_CONFIG } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const fileToGenerativePart = async (file: File) => {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error(`File is too large. Maximum size is ${MAX_FILE_SIZE_BYTES / (1024*1024)}MB.`);
  }
  if (!SUPPORTED_FILE_TYPES.includes(file.type)) {
    throw new Error(`Unsupported file type. Please upload a PDF, JPG, or PNG.`);
  }

  const base64EncodedData = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      } else {
        reject(new Error("Failed to read file as base64 string."));
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: base64EncodedData,
      mimeType: file.type,
    },
  };
};

export const extractText = async (file: File): Promise<string> => {
  const imagePart = await fileToGenerativePart(file);
  const textPart = {
    text: "Extract all text from this document. Present it as clean, readable text without any additional commentary, formatting, or explanations. Just return the raw text content.",
  };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
  });

  if (!response.text) {
    throw new Error("The API did not return any text. The document might be empty or unreadable.");
  }

  return response.text;
};

export const generateSummary = async (text: string, length: SummaryLength): Promise<SummaryOutput> => {
  const config = SUMMARY_LENGTH_CONFIG[length];
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Based on the following text, generate a summary. The text is: "${text}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: {
            type: Type.STRING,
            description: `A concise summary of the text, between ${config.min} and ${config.max} words.`,
          },
          keyPoints: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A bulleted list of the 3-5 most important key points or takeaways from the text.",
          },
          mainIdeas: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A bulleted list of the 2-3 central themes or main ideas discussed in the text.",
          },
        },
        required: ["summary", "keyPoints", "mainIdeas"],
      },
    }
  });

  if (!response.text) {
    throw new Error("The API did not return a summary. Please try again.");
  }
  
  try {
    const parsedJson = JSON.parse(response.text);
    return parsedJson as SummaryOutput;
  } catch (e) {
    console.error("Failed to parse summary JSON:", e);
    throw new Error("The model returned an invalid summary format. Please try again.");
  }
};
