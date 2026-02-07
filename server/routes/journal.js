import express from "express";
import JournalEntry from "../models/JournalEntry.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { mood, text, audioUrl } = req.body;

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