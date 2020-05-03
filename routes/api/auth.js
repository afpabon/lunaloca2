const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const passport = require('../../config/passport');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', async (req, res, next) => {
  try {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info) {
        console.log(info.message);
        res.status(500).send(info.message);
      } else {
        res.status(200).send({
          id: user._id,
          first_name: user.first_name,
          is_admin: user.is_admin,
        });
      }
    })(req, res, next);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      passport.authenticate('login', (err, user, info) => {
        if (err) {
          console.log(err);
        }
        if (info) {
          console.log(info.message);
          res.status(500).send(info.message);
        } else {
          req.logIn(user, async err => {
            const token = await jwt.sign(
              { id: user.email },
              config.get('jwtSecret'),
            );
            res.status(200).send({
              auth: true,
              token,
              user: {
                id: user._id,
                first_name: user.first_name,
                is_admin: user.is_admin,
              },
            });
          });
        }
      })(req, res, next);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('server error');
    }
  },
);

module.exports = router;
