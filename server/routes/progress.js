import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Mood from "../models/Mood.js";
import JournalEntry from "../models/JournalEntry.js";
import Meditation from "../models/Meditation.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    const today = new Date().toISOString().slice(0, 10);

    const journals = await JournalEntry.find({
      user: userId,
      createdAt: { $gte: new Date(today) }
    });
    const journalScore = journals.length * 5;

    const meditationsToday = await Meditation.find({
      user: userId,
      createdAt: { $gte: new Date(today) }
    });

    const meditationScore = meditationsToday.reduce(
      (sum, m) => sum + Math.floor(m.duration / 60) * 2,
      0
    );

    const totalScore = moodScore + journalScore + meditationScore;
    const percent = Math.min(Math.round((totalScore / 25) * 100), 100);

    const moods = await Mood.find({ userId }).sort({ date: -1 });

    let streak = 0;
    let currentDate = today;

    for (const m of moods) {
      if (m.date === currentDate) {
        streak++;
        const d = new Date(currentDate);
        d.setDate(d.getDate() - 1);
        currentDate = d.toISOString().slice(0, 10);
      } else {
        break;
      }
    }

    const totalDays = await Mood.countDocuments({ userId });

    const meditations = await Meditation.find({ user: userId });
    const totalMeditationMinutes = meditations.reduce(
      (sum, m) => sum + Math.floor(m.duration / 60),
      0
    );

    res.json({
      percent,
      streak,
      totalDays,
      totalMeditationMinutes,
    });

  } catch (e) {
    res.status(500).json({ message: "Failed to calculate progress" });
  }
});

export default router;