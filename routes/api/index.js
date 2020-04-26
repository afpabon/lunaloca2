const express = require('express');

const auth = require('./auth');
const usersRouter = require('./users');

const router = express.Router();

router.use('/users', usersRouter);

module.exports = router;
