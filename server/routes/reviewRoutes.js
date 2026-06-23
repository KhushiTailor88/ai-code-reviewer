const express = require('express');
const { createReview, getReviewHistory, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createReview);
router.get('/history', protect, getReviewHistory);
router.delete('/:id', protect, deleteReview);

module.exports = router;
