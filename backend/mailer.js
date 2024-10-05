const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an OTP email to the user.
 * @param {string} to - The recipient's email address.
 * @param {string} otp - The OTP to send.
 */
const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending OTP email:', error);
  }
};

/**
 * Send a login success email to the user.
 * @param {string} to - The recipient's email address.
 * @param {string} username - The recipient's username.
 */
const sendLoginSuccessEmail = async (to, username) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Login Successful',
    text: `Hello ${username},\n\nYou have successfully logged into your account.\n\nBest regards,\nExclusive`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending login success email:', error);
  }
};

module.exports = {
  sendOtpEmail,
  sendLoginSuccessEmail,
};
