import { Router } from "express";
import {
  listPapers,
  getPaper,
  createPaper,
  updatePaper,
  deletePaper,
  toggleSave,
  savedPapers,
} from "../controllers/paperController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.get("/", listPapers);
r.get("/saved", protect, savedPapers);
r.get("/:id", getPaper);
r.post("/:id/save", protect, toggleSave);
r.post("/", protect, adminOnly, createPaper);
r.patch("/:id", protect, adminOnly, updatePaper);
r.delete("/:id", protect, adminOnly, deletePaper);
export default r;
