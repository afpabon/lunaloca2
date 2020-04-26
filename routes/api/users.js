const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('./auth');

const User = mongoose.model('user');
const usersRouter = express.Router();

// @route   POST api/users
// @desc    Register user
// @access  Public
usersRouter.post(
  '/',
  [
    auth.optional,
    [
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters',
      ).isLength({ min: 6 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }

      const finalUser = new User();
      finalUser.email = email;

      finalUser.setPassword(password);
      await finalUser.save();
      res.json({ user: finalUser.toAuthJSON() });
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

//POST login route (optional, everyone has access)
usersRouter.post('/login', auth.optional, async (req, res, next) => {
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate(
    'local',
    { session: false },
    async (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = await passportUser.generateJWT();

        return res.json({ user: user.toAuthJSON() });
      }

      return status(400).info;
    },
  )(req, res, next);
});

//GET current route (required, only authenticated users have access)
usersRouter.get('/current', auth.required, (req, res, next) => {
  const {
    payload: { id },
  } = req;

  return User.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

module.exports = usersRouter;
