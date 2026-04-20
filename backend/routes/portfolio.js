const express = require('express');
const router = express.Router();
const {
  getMyPortfolio,
  createPortfolio,
  updatePortfolio,
  getPublicPortfolio
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/auth');

// Private routes
router.get('/', protect, getMyPortfolio);
router.post('/', protect, createPortfolio);
router.put('/', protect, updatePortfolio);

// Public route — must come after specific routes
router.get('/:username', getPublicPortfolio);

module.exports = router;
