require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// require('dotenv').config(); // Ensure this line is at the top

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const { emails, displayName } = profile;
    const email = emails[0]?.value; // Ensure emails[0] exists
    return done(null, { email, displayName });
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;
