import express from "express";
import Quote from "../models/Quote.js";

const router = express.Router();

router.get("/random", async (req, res) => {
  try {
    const count = await Quote.countDocuments();
    const random = Math.floor(Math.random() * count);

    const quote = await Quote.findOne().skip(random);

    res.json(quote);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch quote" });
  }
});

export default router;