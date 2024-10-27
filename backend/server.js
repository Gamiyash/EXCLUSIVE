
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const session = require('express-session');
const passport = require('./passport-config');
const { sendOtpEmail, sendLoginSuccessEmail } = require('./mailer');
const User = require('./models/user')
const productRoutes = require('./routes/AllProductsRoutes/products');
const FlashProductRoutes = require('./routes/FlashProductsRoutes/FlashProducts')
const ThismonthRoutes = require('./routes/ThisMonthBestProductsRoutes/Thismonth')
const FlashcartRoutes = require('./routes/FlashProductsRoutes/Flashsalecart')
const DeleteProductRoutes = require("./routes/CartRoutes/DeleteperticularProduct")
const DeleteWishListProducts = require("./routes/WishlistDeleteroute/WishlistDeleteRoutr")
const ClearAllProductRoutes = require('./routes/CartRoutes/CleareAllProduct')
const UpdateCartRoutes = require('./routes/CartRoutes/UpdateCartRoute')
const productcartRoutes = require("./routes/AllProductsRoutes/Productcart")
const ThismonthscartRoutes = require("./routes/ThisMonthBestProductsRoutes/Thismonthcart")
const WomenFashionWishListRoutes = require('./routes/AllProductsRoutes/WishList')
const FlashWishlistRoutes = require("./routes/FlashProductsRoutes/FlashWishlist")
const ThismonthWishlistRoutes = require('./routes/ThisMonthBestProductsRoutes/ThisMonthWishlist')
const flashproductcommentRoutes = require("./routes/FlashProductsRoutes/flashproductcomment")
const ProductcemmentsRoutes = require("./routes/AllProductsRoutes/Productcomment")
const ThismonthcommentsRoutes = require("./routes/ThisMonthBestProductsRoutes/Thismonthcomment")

//Profile_pic 
const Upload_ProfilepicRoute = require('./routes/BillingDetailsOfUsers/Profile_pic')


//Cuppon Route
const CupponRoute = require('./routes/Cuppon/Cuppon')

//BillingDetailsRoute
const UserBillingDetailsRoute = require('./routes/BillingDetailsOfUsers/UserBillingData')

//RazorpayRoutes
const RazorPayPaymentGetway = require('./routes/Razorpay_Payment/RazorPayPayment')

const mongoose = require('./db');

dotenv.config();

const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = 'EcommorceSignup';
const app = express();
const port = 3000;

const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: `${process.env.MONGO_URI}/sessions`,
  collection: 'sessions'
});


store.on('error', function (error) {
  console.log(error); // Handle error in case MongoDB connection fails
});

const cors = require('cors');

store.on('error', function (error) {
  console.log(error);
});

app.use(cors({
  origin: `${process.env.FRONTEND_URL}`, // Your frontend URL
  credentials: true,
}));

// app.use(cors({
//   origin:['http://localhost:5173', 'http://192.168.198.140:3000'], // Your frontend URL
//   credentials: true,
// }));

app.use(bodyParser.json());
// app.use(session({ secret: '8f8cf9d5b54eb1e3f8a3d637f0b2d9f1', resave: false, saveUninitialized: true ,cookie: { secure: true}}));
app.use(passport.initialize());

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: false,
//   store: store,
//   cookie: {
//     secure: false, // Set to true only if using HTTPS
//     sameSite: 'strict',
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   }
// }));

app.use(session({
  secret: process.env.SESSION_SECRET, // Replace with your own secret
  resave: false,
  saveUninitialized: false,
  store: new MongoDBStore({
    uri: `${process.env.MONGO_URI}/EcommorceSignup`, // MongoDB URI
    collection: 'sessions'
  }),
  cookie: {
    maxAge: null,
    sameSite: 'None',
    // maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true, // Helps prevent XSS attacks
    secure: false // Set to true if using HTTPS
  }
}));


app.use(passport.initialize());//new
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  // console.log('Session:', req.session);
  next();
});

app.use('/api', productRoutes);
app.use('/api', FlashProductRoutes);
app.use('/api', ThismonthRoutes);
app.use('/api', FlashcartRoutes);
app.use("/api", DeleteProductRoutes);
app.use('/api', DeleteWishListProducts);
app.use('/api', ClearAllProductRoutes);
app.use('/api', UpdateCartRoutes);
app.use('/api', productcartRoutes);
app.use('/api', ThismonthscartRoutes);
app.use('/api/Flashproducts', flashproductcommentRoutes);
app.use('/api/products', ProductcemmentsRoutes);
app.use('/api/Thismonth', ThismonthcommentsRoutes);
app.use('/api', WomenFashionWishListRoutes);
app.use('/api', FlashWishlistRoutes)
app.use('/api', ThismonthWishlistRoutes)

//Profile_pic
app.use('/api', Upload_ProfilepicRoute);
app.use('/uploads', express.static('uploads')); // Serve static files from the uploads directory


//CupponRoute
app.use('/api', CupponRoute)

//BillingDetailsRoute
app.use('/api', UserBillingDetailsRoute)

//RazorPayment
app.use('/api', RazorPayPaymentGetway);

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next(); // User is authenticated, continue
  } else {
    res.status(401).json({ message: 'Unauthorized, please login' }); // No session, send unauthorized response
  }
}

// Use this middleware on protected routes
app.use('/protected-route', isAuthenticated, (req, res) => {
  res.json({ message: 'Welcome to the protected route!' });
});

// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.status(401).json({ message: 'Not authenticated' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => { // Ensure to use your JWT secret
//     if (err) return res.status(403).json({ message: 'Forbidden' });
//     req.user = user;
//     next();
//   });
// };
// app.get('/api/protected', authenticateToken, (req, res) => {
//   res.json({ message: 'Protected data', user: req.user });
// });


// app.use('/api', productRoutes);

client.connect().catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});



client.connect().catch(err => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});

const otpStore = new Map();

const generateOtp = () => {
  return crypto.randomInt(1000, 9999).toString();
};


app.post('/Signup', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('EcommorceLoginData');
    const { username, email, password } = req.body;

    // Check if the user exists by email
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      // Update existing user if email already exists
      const hashedPassword = await bcrypt.hash(password, 10);
      await collection.updateOne(
        { email },
        { $set: { username, password: hashedPassword } }
      );
      return res.status(200).json({ success: true, message: 'User updated' });
    }

    // if (existingUser) {
    //   if (existingUser.email) {
    //     // If the user has signed up with Google, alert the user
    //     return res.status(400).json({ message: 'Email already associated with a Google login. Please log in with Google.' });
    //   } else {
    //     // Update existing user password if they signed up manually
    //     const hashedPassword = await bcrypt.hash(password, 10);
    //     await collection.updateOne(
    //       { email },
    //       { $set: { username, password: hashedPassword } }
    //     );
    //     return res.status(200).json({ success: true, message: 'User updated' });
    //   }
    // }

    // Create new user if email does not exist
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await collection.insertOne({ username, email, password: hashedPassword });

    // Create a new database for the user if it does not exist
    const userDb = client.db(email.replace(/[^a-zA-Z0-9_]/g, '_'));
    const userCollection = userDb.collection('UserData');

    const userDbExists = await client.db(userDb.databaseName).listCollections({ name: 'UserData' }).hasNext();

    if (!userDbExists) {
      await userCollection.insertOne({ username, email, password: hashedPassword });
    }
    const UserProfile = await userCollection.find({}).toArray();

    if (userCollection.length === 0) {
      return res.status(400).json({ message: 'No User Data Available' });
    }

    // Insert all items into the checkout collection
    await User.insertMany(UserProfile);

    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error('Error in /Signup:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});
app.post('/Login', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('EcommorceLoginData');
    const { email, password } = req.body;

    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate OTP
    const otp = generateOtp();
    otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

    await sendOtpEmail(user.email, otp);

    // Generate JWT token
    // const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // res.cookie('token', token, {
    //   httpOnly: true,
    //   secure:false, // Change to true if using HTTPS
    //   sameSite: 'strict', // Adjust as needed
    //   expires: new Date(Date.now() + 3600000) // 1 hour
    // });

    req.session.user = {
      email: user.email,
      username: user.username,
      otpVerified: true,
    };

    // Send combined response
    // res.cookie('token', token, {
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 3600000), // 1 hour
    //   // Ensure this is set correctly
    // }); // 1 hour
    // res.status(200).json({ success: true, message: 'Login successful and OTP sent to your email' });
    res.status(200).json({
      success: true,
      message: 'Login successful and OTP sent to your email',
      user: {
        email: user.email,
        displayName: user.displayName || user.username, // Include other user data as needed
      },
    });
  } catch (error) {
    console.error('Error in /Login:', error);
    res.status(500).json({ success: false, message: 'Invalid email or password' });
  }
});

app.post('/api/change-password/:email', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const { email } = req.params;
    // Assuming the user is already authenticated via session
    // if (!req.session.user || !req.session.user.email) {
    //   return res.status(401).json({ message: 'Unauthorized' });
    // }

    const db = client.db(dbName);
    const collection = db.collection('EcommorceLoginData');

    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    await collection.updateOne(
      { email },
      { $set: { password: hashedNewPassword } }
    );

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error in /change-password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/VerifyOtp', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('EcommorceLoginData');
    const { email, otp } = req.body;

    const otpEntry = otpStore.get(email);
    if (!otpEntry || otpEntry.otp !== otp || Date.now() > otpEntry.expires) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    otpStore.delete(email);
    const user = await collection.findOne({ email });

    await sendLoginSuccessEmail(email, user.username);

    res.status(200).json({ success: true, message: 'Login successful', user: { username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error in /VerifyOtp:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Google OAuth routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

function sanitizeName(name) {
  return name.replace(/[^a-zA-Z0-9_]/g, '_'); // Replace invalid characters with an underscore
}



app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  async (req, res) => {
    try {
      console.log('Google user info:', req.user);

      const db = client.db(dbName);
      const collection = db.collection('EcommorceLoginData');
      const { email, displayName } = req.user;
      const userDbName = sanitizeName(email.replace(/[^a-zA-Z0-9_]/g, '_'));

      // Check if user exists by email
      const existingUser = await collection.findOne({ email });


      if (existingUser) {
        // If the user exists, we can either update their information or just log them in
        req.session.user = {
          email: existingUser.email,
          username: existingUser.username || displayName,
          otpVerified: true, // Assuming Google login is automatically verified
        };
      } else {
        // If the user does not exist, create a new user
        await collection.insertOne({ username: displayName, email });

        // Set the session for the new user
        req.session.user = {
          email,
          username: displayName,
          otpVerified: true,
        };
      }

      // Create or update user database
      const userDb = client.db(userDbName);
      const userCollection = userDb.collection('UserData');
      const userDbExists = await client.db(userDb.databaseName).listCollections({ name: 'UserData' }).hasNext();

      if (!userDbExists) {
        await userCollection.insertOne({ username: displayName, email });
      }
      const UserProfile = await userCollection.find({}).toArray();

      if (userCollection.length === 0) {
        return res.status(400).json({ message: 'No User Data Available' });
      }
      const userExists = await User.findOne({ email });
      if (!userExists) {
        // Insert all items into the UserData collection
        await User.insertMany(UserProfile);
      } else {
        await User.updateOne(
          { email }, // Match by email in 'User' collection
          { $set: { email } }, // Only update the username (or other fields as needed)
          { upsert: true } // If no document matches, insert a new one
        );
      }


      res.redirect(`${process.env.FRONTEND_URL}/`);

    } catch (error) {
      console.error('Error in Google OAuth callback:', error);
      // res.redirect('/signup');
    }
  }
);


app.get('/api/auth/session', (req, res) => {
  if (req.isAuthenticated()) {
    // console.log("User is Authenticated:",req.isAuthenticated());
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});


app.get('/api/auth/signout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout error' });
    }
    req.session.destroy(function (err) { // Destroy session in store
      if (err) {
        return res.status(500).send("Error during logout");
      }
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.redirect('/login'); // Redirect to login after logout
    });
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

