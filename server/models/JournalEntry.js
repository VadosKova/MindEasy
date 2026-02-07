import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    mood: {
      type: String,
      enum: ["great", "okay", "low"],
      required: true,
    },

    text: {
      type: String,
      default: "",
    },

    audioUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

journalEntrySchema.pre("save", function () {
  if (!this.text && !this.audioUrl) {
    throw new Error("Journal entry must contain text or audio");
  }
});

export default mongoose.model("JournalEntry", journalEntrySchema);