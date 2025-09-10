
import { GoogleGenAI } from "@google/genai";

// Ensure API_KEY is available in the environment
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getPrediction = async (systemInstruction: string, userPrompt: string): Promise<string> => {
    try {
        console.log("Sending request to Gemini API...");
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        console.log("Received response from Gemini API.");
        
        if (response && response.text) {
            return response.text;
        } else {
            throw new Error("Received an empty response from the AI model.");
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        
        // Provide a more user-friendly error message
        let errorMessage = "Failed to get a prediction from the AI model. ";
        if (error instanceof Error) {
            if (error.message.includes('API key not valid')) {
                errorMessage += "Please check if your API key is correct and valid.";
            } else if (error.message.includes('429')) {
                errorMessage += "You have exceeded your API quota. Please check your usage limits.";
            } else {
                errorMessage += "An unexpected error occurred. Please try again later.";
            }
        }
        
        throw new Error(errorMessage);
    }
};
