import mongoose from "mongoose";
const paperSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, required: true, index: true },
    grade: { type: Number, default: 12 },
    year: { type: Number, required: true, index: true },
    session: {
      type: String,
      enum: ["March", "June", "November", "Other"],
      default: "November",
    },
    paper: { type: Number, default: 1 },
    language: { type: String, default: "English" },
    sourceName: { type: String, required: true },
    sourceUrl: { type: String, required: true },
    pdfUrl: { type: String, default: "" },
    description: { type: String, default: "" },
    topics: [String],
    tags: [String],
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);
paperSchema.index({
  title: "text",
  subject: "text",
  description: "text",
  topics: "text",
});
export default mongoose.model("Paper", paperSchema);
