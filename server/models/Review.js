const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  summary: String,
  bugs: [String],
  securityIssues: [String],
  performanceImprovements: [String],
  cleanCodeSuggestions: [String],
  optimizedCode: String,
  difficulty: String,
  bestPractices: [String],
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema);
