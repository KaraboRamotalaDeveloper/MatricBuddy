import Paper from "../models/Paper.js";
import User from "../models/User.js";
export const listPapers = async (req, res, next) => {
  try {
    const { q, subject, year, session, paper, language } = req.query;
    const filter = { isPublished: true };
    if (subject) filter.subject = subject;
    if (year) filter.year = Number(year);
    if (session) filter.session = session;
    if (paper) filter.paper = Number(paper);
    if (language) filter.language = language;
    if (q) filter.$text = { $search: q };
    const papers = await Paper.find(filter)
      .sort({ year: -1, subject: 1, paper: 1 })
      .limit(100);
    res.json({ papers, count: papers.length });
  } catch (e) {
    next(e);
  }
};
export const getPaper = async (req, res, next) => {
  try {
    const paper = await Paper.findById(req.params.id);
    if (!paper) return res.status(404).json({ message: "Paper not found" });
    res.json({ paper });
  } catch (e) {
    next(e);
  }
};
export const createPaper = async (req, res, next) => {
  try {
    const paper = await Paper.create(req.body);
    res.status(201).json({ paper });
  } catch (e) {
    next(e);
  }
};
export const updatePaper = async (req, res, next) => {
  try {
    const paper = await Paper.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!paper) return res.status(404).json({ message: "Paper not found" });
    res.json({ paper });
  } catch (e) {
    next(e);
  }
};
export const deletePaper = async (req, res, next) => {
  try {
    await Paper.findByIdAndDelete(req.params.id);
    res.json({ message: "Paper deleted" });
  } catch (e) {
    next(e);
  }
};
export const toggleSave = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    const id = req.params.id;
    const exists = user.savedPapers.some((x) => x.toString() === id);
    user.savedPapers = exists
      ? user.savedPapers.filter((x) => x.toString() !== id)
      : [...user.savedPapers, id];
    await user.save();
    res.json({ saved: !exists });
  } catch (e) {
    next(e);
  }
};
export const savedPapers = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("savedPapers");
    res.json({ papers: user.savedPapers });
  } catch (e) {
    next(e);
  }
};
