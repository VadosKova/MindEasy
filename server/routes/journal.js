import express from "express";
import fs from "fs";
import path from "path";
import JournalEntry from "../models/JournalEntry.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { mood, text, audioBase64 } = req.body;

    let audioUrl = "";

    if (audioBase64) {
      const fileName = `audio_${Date.now()}.m4a`;
      const filePath = path.join("uploads", fileName);

      const base64Data = audioBase64.replace(/^data:audio\/\w+;base64,/, "");
      fs.writeFileSync(filePath, base64Data, "base64");

      audioUrl = `http://192.168.88.15:5000/uploads/${fileName}`;
    }

    const entry = new JournalEntry({
      user: req.userId,
      mood,
      text,
      audioUrl,
    });

    await entry.save();
    res.status(201).json(entry.toJSON());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.userId })
      .sort({ createdAt: -1 });

    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: "Failed to load journal" });
  }
});

export default router;