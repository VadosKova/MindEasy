import express from "express";
import User from "../models/Users.js";
import ReportAnalysis from "../models/ReportAnalysis.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

router.put("/", authMiddleware, async (req, res) => {
  const { username, whyUseApp, goals, reminders, avatar, notificationsEnabled, aiAnalysisEnabled } = req.body;

  const updates = { username, whyUseApp, goals, reminders, avatar, notificationsEnabled, aiAnalysisEnabled };

  const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select("-password");

  // If aiAnalysisEnabled was just turned on, run a one-off analysis and store results
  try {
    if (aiAnalysisEnabled) {
      const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const to = new Date();
      // Simple analysis: tag frequencies from journal entries and mood distribution
      const JournalEntry = (await import("../models/JournalEntry.js")).default;
      const Mood = (await import("../models/Mood.js")).default;

      const journals = await JournalEntry.find({ user: req.userId, createdAt: { $gte: from, $lte: to } }).lean();
      const moods = await Mood.find({ userId: req.userId, date: { $gte: from, $lte: to } }).lean();

      const tagCounts = {};
      journals.forEach(j => {
        // naive tag extraction: split by hashtags or comma-separated words (placeholder)
        if (j.text) {
          const words = j.text.match(/#\w+/g) || j.text.split(/[,\.\s]+/).slice(0,10);
          words.forEach(w => { tagCounts[w] = (tagCounts[w] || 0) + 1; });
        }
      });

      const moodDistribution = moods.reduce((acc, m) => { acc[m.mood] = (acc[m.mood]||0)+1; return acc; }, {});

      const analysis = { tagCounts, moodDistribution, journalsCount: journals.length, moodsCount: moods.length };

      await ReportAnalysis.create({ user: req.userId, from, to, results: analysis });
    }
  } catch (err) {
    console.error('AI analysis failed', err);
  }

  res.json(user);
});

export default router;