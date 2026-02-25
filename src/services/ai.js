import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
let genAI;

if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
    genAI = new GoogleGenerativeAI(apiKey);
} else {
    console.warn("Gemini API key is missing or using a placeholder. AI replies will be mocked.");
}

/**
 * Sends a message to the Gemini API and returns the response.
 * @param {string} prompt The user's complex problem or question.
 * @returns {Promise<string>} The AI's markdown-formatted answer.
 */
export async function generateAIResponse(prompt) {
    if (!genAI) {
        // Fallback mock response if API key is not configured yet
        return "I am **MaxAI**! \n\nHowever, it seems my brain (the Gemini API key) hasn't been connected yet. Please add your `VITE_GEMINI_API_KEY` to the `.env` file and restart the development server to unlock my full potential!";
    }

    try {
        // Use the recommended model for text generation / complex problem solving
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Optional: Provide a system instruction if supported by the model version
        // MaxAI should act as a helpful expert problem solver.

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return `**Error:** An issue occurred while contacting my brain. \n\nDetails: _${error.message}_`;
    }
}
