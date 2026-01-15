import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a welcome message for an event based on its details.
 */
export const generateWelcomeMessage = async (eventName: string, hostName: string, eventType: string): Promise<string> => {
  try {
    const prompt = `Write a short, warm, and fun welcome message for guests uploading photos to an event album.
    Event Name: ${eventName}
    Host: ${hostName}
    Event Type: ${eventType}
    Keep it under 50 words. Be inviting!`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Welcome! Please share your photos with us.";
  } catch (error) {
    console.error("AI Generation Error:", error);
    return `Welcome to ${eventName}! We're so glad you're here.`;
  }
};

/**
 * Analyzes an image to provide a description or "vibe check".
 */
export const analyzeImageVibe = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "Describe the vibe of this photo in 3 fun words or a very short sentence. E.g., 'Pure joy!', 'Dance floor madness'."
          }
        ]
      }
    });
    return response.text || "Great shot!";
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return "A beautiful moment captured.";
  }
};