const express = require('express');
const passport = require('passport');
const connectDB = require('./config/db');
const { cloudinaryConfig } = require('./config/cloudinary');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Init passport
app.use(passport.initialize());

// Init Cloudinary
cloudinaryConfig();

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/photos', require('./routes/api/photos'));
app.use('/api/contact', require('./routes/api/contact'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
