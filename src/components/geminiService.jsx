// src/geminiService.jsx
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const askGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    console.log("Gemini raw result:", result); // 👈 debug

    return result.response.text();
  } catch (err) {
    console.error("Gemini API error:", err); // 👈 show error details
    return "Sorry, I couldn’t process that request.";
  }
};
