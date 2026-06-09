import mongoose from "mongoose";

const reportAnalysisSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: Date },
  to: { type: Date },
  results: { type: Object },
}, { timestamps: true });

export default mongoose.model('ReportAnalysis', reportAnalysisSchema);
