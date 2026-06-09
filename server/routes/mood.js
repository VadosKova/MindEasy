import express from "express";
import Mood from "../models/Mood.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const moodScoreMap = {
  bad: 1,
  low: 2,
  okay: 3,
  good: 4,
  great: 5,
};

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { mood } = req.body;
    const { start, end } = getTodayRange();

    const entry = await Mood.findOneAndUpdate(
      {
        userId: req.userId,
        date: { $gte: start, $lte: end },
      },
      {
        userId: req.userId,
        mood,
        score: moodScoreMap[mood],
        date: start,
      },
      { upsert: true, new: true }
    );

    res.json(entry);
  } catch (e) {
    res.status(500).json({ message: "Failed to save mood" });
  }
});

router.get("/today", authMiddleware, async (req, res) => {
  const { start, end } = getTodayRange();

  const mood = await Mood.findOne({
    userId: req.userId,
    date: { $gte: start, $lte: end },
  });

  res.json(mood);
});

export default router;