import Paper from "../models/Paper.js";
import Chat from "../models/Chat.js";
import { askGemini } from "../services/aiService.js";
export const tutor = async (req, res, next) => {
  try {
    const { question, paperId, chatId } = req.body;
    if (!question?.trim())
      return res.status(400).json({ message: "Question is required" });
    let paper = null;
    if (paperId) paper = await Paper.findById(paperId);
    let chat = chatId
      ? await Chat.findById(chatId)
      : await Chat.create({
          user: req.user._id,
          paper: paper ? paper._id : null,
          messages: [],
        });
    const answer = await askGemini({
      question,
      context: paper
        ? `${paper.title}\nSubject: ${paper.subject}\nYear: ${paper.year}\nTopics: ${paper.topics?.join(", ")}`
        : "",
      history: chat.messages.slice(-10),
    });
    chat.messages.push(
      { role: "user", content: question },
      { role: "assistant", content: answer },
    );
    await chat.save();
    res.json({ answer, chatId: chat._id });
  } catch (e) {
    next(e);
  }
};
