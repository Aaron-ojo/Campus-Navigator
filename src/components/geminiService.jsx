import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const askGemini = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    console.log("Gemini raw result:", result);
    return (
      result.response.candidates[0]?.content?.parts[0]?.text ??
      "⚠️ No response from Gemini."
    );
  } catch (err) {
    console.error("Gemini API error:", err);
    return "Sorry, I couldn’t process that request.";
  }
};
