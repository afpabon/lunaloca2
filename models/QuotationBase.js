const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuotationBySizeSchema = new Schema({
  size: Number,
  price: Number,
});

const QuotationBaseSchema = new Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  element: { type: mongoose.Schema.Types.ObjectId, ref: 'Element' },
  name: String,
  description: String,
  quotationbysizes: [QuotationBySizeSchema],
  url: String,
});

module.exports = mongoose.model('quotationbase', QuotationBaseSchema);
