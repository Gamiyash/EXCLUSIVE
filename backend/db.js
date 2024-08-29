const mongoose = require('mongoose');

// Replace this with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/EcommorceSignup';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose;
