const bcrypt = require('bcryptjs');

const BCRYPT_SALT_ROUNDS = 12;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('config');

passport.use(
  'register',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
      session: false,
    },
    async (req, email, password, done) => {
      try {
        let user = await User.findOne({ email });
        if (user != null) {
          return done(null, false, {
            message: 'email already taken',
          });
        }

        user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email,
          avatar: req.body.avatar,
          password,
        });

        const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        delete user.password;

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (email, password, done) => {
      try {
        let user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: 'invalid credentials' });
        }

        delete user.password;

        return done(null, user);
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
  secretOrKey: config.get('jwtSecret'),
};

passport.use(
  'jwt',
  new JWTStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ email: jwt_payload.id }).select(
        '-password',
      );
      if (user) {
        console.log('user found in db in passport');
        done(null, user);
      } else {
        console.log('user not found in db');
        done(null, false, { message: 'invalid token' });
      }
    } catch (err) {
      done(err);
    }
  }),
);

module.exports = passport;
