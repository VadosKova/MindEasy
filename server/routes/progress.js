import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import Mood from "../models/Mood.js";
import JournalEntry from "../models/JournalEntry.js";
import Meditation from "../models/Meditation.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    
    const today = new Date();
    const startOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 0, 0, 0, 0));
    const endOfToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 23, 59, 59, 999));

    const journals = await JournalEntry.find({
      user: userId,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });
    const journalScore = journals.length * 5;

    const meditationsToday = await Meditation.find({
      user: userId,
      createdAt: { $gte: startOfToday, $lte: endOfToday },
    });

    const meditationScore = meditationsToday.reduce(
      (sum, m) => sum + Math.floor(m.duration / 60) * 2,
      0
    );

    const moods = await Mood.find({ userId }).sort({ date: -1 });

    const todayISO = today.toISOString().slice(0, 10);
    const moodScore = moods.some((m) => {
      const moodDateISO = new Date(m.date).toISOString().slice(0, 10);
      return moodDateISO === todayISO;
    })
      ? 5
      : 0;

    const totalScore = moodScore + journalScore + meditationScore;
    const percent = Math.min(Math.round((totalScore / 25) * 100), 100);

    const startOfDay = (date) => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    let streak = 0;
    let dayCursor = startOfDay(new Date());

    for (const m of moods) {
      const moodDay = startOfDay(m.date);

      if (moodDay.getTime() === dayCursor.getTime()) {
        streak++;
        dayCursor.setDate(dayCursor.getDate() - 1);
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
    console.error(e);
    res.status(500).json({ message: "Failed to calculate progress" });
  }
});

export default router;