import express from "express";
import Meditation from "../models/Meditation.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { duration, type } = req.body;

  const meditation = new Meditation({
    user: req.userId,
    duration,
    type,
  });

  await meditation.save();
  res.json(meditation);
});

export default router;