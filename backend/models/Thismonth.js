const mongoose = require('mongoose');

const ThismonthBestProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  sideimg1:String,
  sideimg2:String,
  sideimg3:String,
  sideimg4:String,
  offerPrice: Number,
  actualPrice: Number,
  discount: String,
  rating: Number,
  type:String,
  keyword: { type: [String]},
  suggetion:String,
  discription:String,
  size: { type: [String], required: true },
  comments: [{
    email: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
}]
});

const ThismonthBestProduct = mongoose.model('ThismonthBestProduct', ThismonthBestProductSchema);

module.exports = ThismonthBestProduct ;
