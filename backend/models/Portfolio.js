const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  link: { type: String, trim: true },
  tags: [{ type: String, trim: true }]
});

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: { type: String, trim: true, default: '' },
  bio: { type: String, trim: true, maxlength: [500, 'Bio cannot exceed 500 characters'], default: '' },
  tagline: { type: String, trim: true, maxlength: [150, 'Tagline cannot exceed 150 characters'], default: '' },
  skills: [{ type: String, trim: true }],
  projects: [projectSchema],
  socialLinks: {
    github: { type: String, trim: true, default: '' },
    linkedin: { type: String, trim: true, default: '' },
    twitter: { type: String, trim: true, default: '' },
    website: { type: String, trim: true, default: '' },
    email: { type: String, trim: true, default: '' }
  },
  theme: {
    type: String,
    enum: ['aurora', 'midnight', 'slate', 'forest', 'crimson'],
    default: 'aurora'
  },
  avatar: { type: String, default: '' },
  isPublic: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema);
