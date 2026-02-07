import express from "express";
import Mood from "../models/Mood.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const getToday = () => {
  return new Date().toISOString().slice(0, 10);
};

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { mood } = req.body;
    const date = getToday();

    const entry = await Mood.findOneAndUpdate(
      { userId: req.userId, date },
      { mood, score: moodScoreMap[mood] || 0, date },
      { upsert: true, new: true }
    );

    res.json(entry);
  } catch (e) {
    res.status(500).json({ message: "Failed to save mood" });
  }
});

router.get("/today", authMiddleware, async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);

  const mood = await Mood.findOne({
    userId: req.userId,
    date,
  });

  res.json(mood);
});

export default router;