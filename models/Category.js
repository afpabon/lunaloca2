const mongoose = require('mongoose');
const { Schema } = mongoose;

const ElementSchema = new Schema({
  index: Number,
  name: String,
});

const CategorySchema = new Schema({
  publicid: Number,
  name: String,
  onmenu: Boolean,
  units: String,
  validsizes: [Number],
  elements: [ElementSchema],
});

module.exports = {
  Category: mongoose.model('category', CategorySchema),
  Element: mongoose.model('element', ElementSchema),
};
