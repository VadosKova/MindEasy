import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import authRoutes from "./routes/auth.js";
import moodRoutes from "./routes/mood.js";
import progressRoutes from "./routes/progress.js";
import quoteRoutes from "./routes/quotes.js";
import meditationRoutes from "./routes/meditation.js";
import journalRoutes from "./routes/journal.js";
import profileRoutes from "./routes/profile.js";
import { createAdminIfNotExists } from "./utils/createAdmin.js";

dotenv.config();

const app = express();

createAdminIfNotExists();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quotes", quoteRoutes);
app.use("/api/meditation", meditationRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/profile", profileRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});