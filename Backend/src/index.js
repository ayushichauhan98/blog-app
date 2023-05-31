const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const postRoutes = require('./routes/posts');
const cookieParser = require("cookie-parser")

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(cookieParser());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/posts', postRoutes);

// Connect to the database
mongoose
  .connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    // Start the server
    app.listen(5000, () => {
      console.log('Server started on port 5000');
    });
  })
  .catch((error) => console.error(error));
