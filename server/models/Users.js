import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    hour: { type: Number, required: true },
    minute: { type: Number, required: true },
    enabled: { type: Boolean, default: true },
  },
  { _id: false }
);

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
  notificationsEnabled: {
    type: Boolean,
    default: true,
  },
  reminders: {
    type: [reminderSchema],
    default: [
      {
        id: "daily-checkin",
        title: "Daily check-in",
        hour: 9,
        minute: 0,
        enabled: true,
      },
      {
        id: "meditation",
        title: "Meditation reminder",
        hour: 20,
        minute: 0,
        enabled: true,
      },
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