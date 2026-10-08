import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import paperRoutes from "./routes/paperRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { notFound, errorHandler } from "./middleware/error.js";
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL ||"https://matricbuddyapp.netlify.app/" || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/ai", rateLimit({ windowMs: 60 * 1000, max: 30 }));
app.get("/api/health", (req, res) =>
  res.json({ ok: true, name: "MatricBuddy" }),
);
app.use("/api/auth", authRoutes);
app.use("/api/papers", paperRoutes);
app.use("/api/ai", aiRoutes);
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;

connectDB()
  .then(() =>
    app.listen(port, "0.0.0.0", () =>
      console.log(`MatricBuddy API running on ${port}`),
    ),
  )
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
