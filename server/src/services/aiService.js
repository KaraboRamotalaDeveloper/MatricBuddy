import axios from "axios";
export const askGemini = async ({ question, context = "", history = [] }) => {
  if (!process.env.GEMINI_API_KEY)
    throw Object.assign(new Error("GEMINI_API_KEY is not configured"), {
      status: 503,
    });
  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const prompt = `You are MatricBuddy AI Tutor for South African Grade 12 learners. Your job is to teach, not just dump answers. Start by identifying what the learner needs to know, then give a clear explanation. For maths/science, show reasoning step by step. If the learner asks for an answer, explain it and encourage understanding. Never claim certainty about exam predictions.\n\nPaper context:\n${context || "No paper context supplied."}\n\nConversation:\n${history.map((m) => m.role + ": " + m.content).join("\n")}\n\nLearner question:\n${question}`;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
  const { data } = await axios.post(
    url,
    { contents: [{ parts: [{ text: prompt }] }] },
    { timeout: 30000 },
  );
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "I could not generate a response right now."
  );
};
