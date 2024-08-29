// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const { MongoClient, ObjectId } = require('mongodb');
// const dotenv = require('dotenv');

// dotenv.config();

// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);
// const dbName = 'EcommorceSignup';

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/api/auth/google/callback'
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection('EcommorceLoginData');
    
//     let user = await collection.findOne({ googleId: profile.id });

//     if (!user) {
//       const result = await collection.insertOne({
//         googleId: profile.id,
//         username: profile.displayName,
//         email: profile.emails[0].value,
//       });
//       user = await collection.findOne({ _id: result.insertedId });
//     }

//     return done(null, user);
//   } catch (err) {
//     return done(err);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user._id); // Ensure that you serialize by _id
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection('EcommorceLoginData');
//     const user = await collection.findOne({ _id: new ObjectId(id) });
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// });

// module.exports = passport;
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
