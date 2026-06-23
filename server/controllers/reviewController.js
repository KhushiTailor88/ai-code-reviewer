const Review = require('../models/Review');
const { analyzeCode } = require('../services/geminiService');

const createReview = async (req, res) => {
  const { code, language } = req.body;
  const userId = req.user.id;

  try {
    const analysis = await analyzeCode(code, language);
    
    const review = await Review.create({
      userId,
      code,
      language,
      ...analysis
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error analyzing code', error: error.message });
  }
};

const getReviewHistory = async (req, res) => {
  const userId = req.user.id;

  try {
    const history = await Review.find({ userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history', error: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const review = await Review.findOneAndDelete({ _id: id, userId });
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting review', error: error.message });
  }
};

module.exports = { createReview, getReviewHistory, deleteReview };
