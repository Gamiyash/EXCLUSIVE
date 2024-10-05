const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  profileImage: { type: String, default: '' },
  // Add other fields as necessary
});

module.exports = mongoose.model('User', UserSchema);
