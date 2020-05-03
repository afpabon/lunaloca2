const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const authToken = req.header('Authorization');

  // Check if not authToken
  if (!authToken) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const token = authToken.substr(4);
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
