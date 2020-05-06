const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const nodemailer = require('nodemailer');

// @route    POST api/contact
// @desc     Send email with contact information
// @access   Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'message',
      'Please enter a message with 10 or more characters',
    ).isLength({ min: 10 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, phonenumber, subject, message } = req.body;

      const transporter = nodemailer.createTransport({
        service: config.get('emailService'),
        auth: {
          user: config.get('emailUser'),
          pass: config.get('emailPassword'),
        },
      });

      var mailOptions = {
        from: config.get('emailUser'),
        to: config.get('emailUser'),
        subject: `Contacto Lunaloca -- ${subject || 'NO ESPECIFICADO'}`,
        text: `De: ${email} (${name})\nTeléfono: ${phonenumber}\n${message}`,
      };

      const { error, info } = await transporter.sendMail(mailOptions);
      if (error) {
        console.log(error);
        res.status(500).send('Server Error');
      } else {
        res.json({ status: true, message: 'Email sent' });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;
