import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: { type: String, default: "" },
  username: { type: String, default: "", required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  whyUseApp: { type: String, default: "To feel calmer and understand myself better" },
  goals: {
    type: [String],
    default: [
      "Feel calmer",
      "Sleep better",
      "Handle anxiety",
    ],
  },
  reminders: {
    type: [String],
    default: [
      "Daily check-in",
      "Meditation reminder",
    ],
  },
  streak: { type: Number, default: 0 },
  totalDays: { type: Number, default: 0 },
  totalMinutes: { type: Number, default: 0 },
  lastMeditationDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);