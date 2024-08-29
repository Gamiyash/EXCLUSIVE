const mongoose = require('mongoose');

const MensFashionSchema = new mongoose.Schema({
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
  discription:String,
  size: { type: [String], required: true },
  comments: [{
    email: String,
    comment: String,
    createdAt: { type: Date, default: Date.now }
}]
});

const MensFashion = mongoose.model('MensFashion', MensFashionSchema);

module.exports = MensFashion;
