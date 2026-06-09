import mongoose from "mongoose";
import Quote from "../models/Quote.js";
import dotenv from "dotenv";

dotenv.config();

const quotes = [
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "Almost everything will work again if you unplug it for a few minutes.",
    author: "Anne Lamott",
  },
  {
    text: "You don’t have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
  },
  {
    text: "Slow down and everything you are chasing will come around and catch you.",
    author: "John De Paola",
  },
];

async function seedQuotes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Quote.deleteMany();
    await Quote.insertMany(quotes);

    console.log("Quotes seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedQuotes();