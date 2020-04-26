const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const Users = require('../models/User');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
    },
    async (email, password, done) => {
      const user = Users.findOne({ email });
      try {
        if (!user || !user.validatePassword(password)) {
          return done(null, false, {
            errors: { 'email or password': 'is invalid' },
          });
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    },
  ),
);
