import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ["bad", "low", "okay", "good", "great"],
      required: true,
    },
  },
  { timestamps: true }
);

moodSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("Mood", moodSchema);