const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// ✅ SIMPLE CORS (LOCAL TEST)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (
      origin.includes('vercel.app') ||
      origin.includes('localhost')
    ) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/portfolio', require('./routes/portfolio'));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio Builder API is running 🚀', status: 'ok' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});