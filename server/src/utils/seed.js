import "dotenv/config";
import { connectDB } from "../config/db.js";
import Paper from "../models/Paper.js";
await connectDB();
await Paper.deleteMany({});
await Paper.insertMany([
  {
    title: "Mathematics Paper 1",
    subject: "Mathematics",
    grade: 12,
    year: 2024,
    session: "November",
    paper: 1,
    language: "English",
    sourceName: "Official source",
    sourceUrl: "https://www.education.gov.za/",
    pdfUrl: "https://www.education.gov.za/",
    topics: ["Algebra", "Functions", "Calculus"],
  },
  {
    title: "Mathematics Paper 2",
    subject: "Mathematics",
    grade: 12,
    year: 2024,
    session: "November",
    paper: 2,
    language: "English",
    sourceName: "Official source",
    sourceUrl: "https://www.education.gov.za/",
    pdfUrl: "https://www.education.gov.za/",
    topics: ["Geometry", "Probability", "Statistics"],
  },
  {
    title: "Physical Sciences Paper 1",
    subject: "Physical Sciences",
    grade: 12,
    year: 2024,
    session: "November",
    paper: 1,
    language: "English",
    sourceName: "Official source",
    sourceUrl: "https://www.education.gov.za/",
    pdfUrl: "https://www.education.gov.za/",
    topics: ["Mechanics", "Waves", "Electricity"],
  },
]);
console.log("Seeded");
process.exit();
