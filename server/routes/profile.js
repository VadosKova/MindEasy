import express from "express";
import User from "../models/Users.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

router.put("/", authMiddleware, async (req, res) => {
  const { username, whyUseApp, goals, reminders, avatar } = req.body;

  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      username,
      whyUseApp,
      goals,
      reminders,
      avatar,
    },
    { new: true }
  ).select("-password");

  res.json(user);
});

export default router;