import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  avatar: { type: String, default: "" },
  username: { type: String, default: "", required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);