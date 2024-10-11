const express = require('express');
const multer = require('multer');
const { MongoClient } = require('mongodb');
const path = require('path');
const router = express.Router();
const User = require('../../models/user'); // Ensure the User model exists and is correct
const mongoose = require('mongoose');

// Configure multer storage for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the file name
  }
});

const upload = multer({ storage });

// Route to fetch user profile(by email)
router.get('/getProfile', async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ profileImage: user.profileImage });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to update user profile picture
router.post('/updateProfile', upload.single('profilePicture'), async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.file) {
      user.profileImage = `/uploads/${req.file.filename}`; // Store the file path
    }

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', profileImage: user.profilePicture });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to fetch all users
router.get('/getAllUsers', async (req, res) => {
  try {
 
    const users = await User.find(); // Fetch all users from the User collection
    console.log(users.length)
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users); // Return all users
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


module.exports = router;
