const mongoose = require('mongoose');
const { Schema } = mongoose;

const PhotoSchema = new Schema({
  url: String,
  description: String,
  categories: Array,
  starred: Boolean,
  quotable: Boolean,
  baseid: Schema.Types.ObjectId,
  tags: Array,
});

module.exports = mongoose.model('photo', PhotoSchema);
