# Document Summary Assistant

A modern web application where users can upload PDF or image documents to extract text and generate intelligent summaries of varying lengths (short, medium, long). This MVP showcases a seamless user experience built with a powerful, modern tech stack.

## Features

- **Multi-Format Document Upload**: Supports PDF, JPG, and PNG file formats.
- **Drag & Drop Interface**: Modern, intuitive drag-and-drop file input area, with a standard file picker as a fallback.
- **Client-Side Validation**: Checks for file type and size (max 10MB) before uploading to ensure efficiency.
- **AI-Powered Text Extraction**: Utilizes the Google Gemini model to robustly extract text content from both PDFs and images.
- **Smart Summarization**: Leverages Gemini's generative capabilities to produce high-quality summaries.
- **Customizable Summary Length**: Users can choose between short (~50-80 words), medium (~120-150 words), and long (~200-250 words) summaries.
- **Structured Output**: The generated summary is broken down into a main paragraph, key points, and main ideas for easy consumption.
- **Responsive & Clean UI**: A simple, mobile-first design built with Tailwind CSS for a great experience on any device.
- **Clear User Feedback**: Provides loading states and handles potential errors gracefully to keep the user informed.

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **AI/ML**: Google Gemini API (`gemini-2.5-flash`)
- **Build Tool**: Vite
- **Deployment**: Vercel / Netlify

## Local Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-repo/document-summary-assistant.git
    cd document-summary-assistant
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the project root and add your Google Gemini API key:
    ```
    API_KEY=YOUR_GEMINI_API_KEY
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

## Approach

This project was built using a frontend-centric approach, leveraging the power of the multimodal Google Gemini API to handle complex backend tasks like OCR and text summarization. By sending the file directly from the client to the Gemini API, we eliminate the need for a dedicated backend server, simplifying the architecture and reducing maintenance overhead.

The application state is managed within the main `App` component using React hooks, providing a clear and predictable data flow. File validation is handled on the client side for immediate user feedback. The Gemini API is prompted to return a structured JSON object containing the summary, key points, and main ideas. This ensures the data is consistent and easy to render, resulting in a robust, efficient, and scalable MVP.