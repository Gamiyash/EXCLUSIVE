const mongoose = require('mongoose');

// Replace this with your MongoDB connection string
const mongoURI = `${process.env.MONGO_URI}/EcommorceSignup`;

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
