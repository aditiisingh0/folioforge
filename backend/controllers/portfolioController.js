const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

// @desc    Get logged-in user's portfolio
// @route   GET /api/portfolio
// @access  Private
exports.getMyPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ userId: req.user.id });
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found.' });
    }
    res.json({ portfolio });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Create portfolio
// @route   POST /api/portfolio
// @access  Private
exports.createPortfolio = async (req, res) => {
  try {
    const existing = await Portfolio.findOne({ userId: req.user.id });
    if (existing) {
      return res.status(400).json({ message: 'Portfolio already exists. Use PUT to update.' });
    }

    const portfolioData = { ...req.body, userId: req.user.id, username: req.user.username };
    const portfolio = await Portfolio.create(portfolioData);
    res.status(201).json({ message: 'Portfolio created!', portfolio });
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Update portfolio
// @route   PUT /api/portfolio
// @access  Private
exports.updatePortfolio = async (req, res) => {
  try {
    const allowedFields = ['name', 'bio', 'tagline', 'skills', 'projects', 'socialLinks', 'theme', 'avatar', 'isPublic'];
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: req.user.id },
      updateData,
      { new: true, runValidators: true, upsert: true }
    );

    res.json({ message: 'Portfolio updated!', portfolio });
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get public portfolio by username
// @route   GET /api/portfolio/:username
// @access  Public
exports.getPublicPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    const portfolio = await Portfolio.findOne({
      username: username.toLowerCase(),
      isPublic: true
    });

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found or is private.' });
    }

    const user = await User.findById(portfolio.userId).select('name email username createdAt');

    res.json({ portfolio, user });
  } catch (error) {
    console.error('Get public portfolio error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};
