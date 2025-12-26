
import { GoogleGenAI } from "@google/genai";

// We initialize inside a getter to ensure process.env is accessed only when needed, 
// and handle cases where it might be missing or the key is empty.
const getAiClient = () => {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : "";
  return new GoogleGenAI({ apiKey: apiKey || '' });
};

export async function getAiRecommendation(userQuery: string) {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User wants a podcast recommendation based on this interest: "${userQuery}". Give a short, engaging response including a suggested topic and why they would like it. Keep it under 50 words.`,
      config: {
        temperature: 0.7,
      }
    });
    return response.text || "I couldn't find a recommendation right now. Try exploring our featured section!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my AI brain right now, but check out 'Tech Talk Today'—it's a fan favorite!";
  }
}
