
import { GoogleGenAI } from "@google/genai";

// Always use const ai = new GoogleGenAI({apiKey: process.env.API_KEY});
// Use process.env.API_KEY directly as it is assumed to be available in this environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getAiRecommendation(userQuery: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User wants a podcast recommendation based on this interest: "${userQuery}". Give a short, engaging response including a suggested topic and why they would like it. Keep it under 50 words.`,
      config: {
        temperature: 0.7,
      }
    });
    // The response.text property (not method) directly returns the generated text content.
    return response.text || "I couldn't find a recommendation right now. Try exploring our featured section!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my AI brain right now, but check out 'Tech Talk Today'—it's a fan favorite!";
  }
}
