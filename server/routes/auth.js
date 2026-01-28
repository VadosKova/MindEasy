import express from "express";
import Users from "../models/Users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const { username, email, password } = req.body;
    const existingUser = await Users.findOne({ $or: [{ username }, { email }] });
    console.log("Existing user check:", existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new Users({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
});