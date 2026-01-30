import express from "express";
import User from "../models/Users.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});