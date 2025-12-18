
import { GoogleGenAI } from "@google/genai";

export const geminiService = {
  async getCosmicInsight(topic: string): Promise<string> {
    // Fix: Always initialize GoogleGenAI with the named apiKey parameter from process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Fix: Use gemini-3-pro-preview for complex STEM/astrophysics reasoning tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Provide an insight about: ${topic}`,
      config: {
        // Fix: Use systemInstruction for persona and formatting rules
        systemInstruction: "You are a world-class astrophysicist and space educator. Provide a fascinating, concise insight (approx 150 words). Use a poetic yet scientific tone. Include one mind-blowing fact.",
      }
    });
    // Fix: Directly access the .text property on GenerateContentResponse as a string
    return response.text || "The stars are silent today...";
  }
};
