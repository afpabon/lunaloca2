const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  is_admin: {
    type: Boolean,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
