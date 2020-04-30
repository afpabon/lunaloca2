const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const passport = require('../../config/passport');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  [
    check('first_name', 'First Name is required')
      .not()
      .isEmpty(),
    check('last_name', 'Last Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({ min: 6 }),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      passport.authenticate('register', (err, user, info) => {
        if (err) {
          console.log(err);
        }
        if (info) {
          console.log(info);
          res.status(500).send(info.message);
        } else {
          req.logIn(user, async err => {
            const avatar = normalize(
              gravatar.url(user.email, {
                s: '200',
                r: 'pg',
                d: 'mm',
              }),
              { forceHttps: true },
            );

            user.avatar = avatar;

            await user.save();
            res.status(200).send({ message: 'user created' });
          });
        }
      })(req, res, next);
    } catch (err) {
      console.log(err);
      res.status(500).send('server error');
    }
  },
);

module.exports = router;
