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

const moodScoreMap = {
  bad: 1,
  low: 2,
  okay: 3,
  good: 4,
  great: 5,
};

moodSchema.add({
  score: Number,
});

moodSchema.pre("save", function (next) {
  this.score = moodScoreMap[this.mood] || 0;
  next();
});

export default mongoose.model("Mood", moodSchema);