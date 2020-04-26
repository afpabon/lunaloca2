const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Load models
const User = require('./models/User');

const connectDB = require('./config/db');
const router = require('./routes/api');

// Initialize express
const app = express();

// Initialize passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }),
);

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Init router
app.use('/api', router);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
