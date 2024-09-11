
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
const productRoutes = require('./routes/AllProductsRoutes/products');
const FlashProductRoutes = require('./routes/FlashProductsRoutes/FlashProducts')
const ThismonthRoutes = require('./routes/ThisMonthBestProductsRoutes/Thismonth')
const WomenFashionRoutes = require("./routes/WomenFashionProductsRoutes/WomenFashionRoute")
const MensFashionRoutes = require('./routes/MensFashionProductsRoutes/MensFashionProducts')
const FlashcartRoutes = require('./routes/FlashProductsRoutes/Flashsalecart')
const DeleteProductRoutes = require("./routes/CartRoutes/DeleteperticularProduct")
const DeleteWishListProducts = require("./routes/WishlistDeleteroute/WishlistDeleteRoutr")
const ClearAllProductRoutes = require('./routes/CartRoutes/CleareAllProduct')
const UpdateCartRoutes = require('./routes/CartRoutes/UpdateCartRoute')
const productcartRoutes = require("./routes/AllProductsRoutes/Productcart")
const ThismonthscartRoutes = require("./routes/ThisMonthBestProductsRoutes/Thismonthcart")
const WomenFashionCartRoutes = require('./routes/WomenFashionProductsRoutes/WomenFashionCart')
const WomenFashionWishListRoutes = require('./routes/AllProductsRoutes/WishList')
const FlashWishlistRoutes = require("./routes/FlashProductsRoutes/FlashWishlist")
const ThismonthWishlistRoutes = require('./routes/ThisMonthBestProductsRoutes/ThisMonthWishlist')
const MensFashionCartRoutes = require('./routes/MensFashionProductsRoutes/MensFashionCart')
const flashproductcommentRoutes = require("./routes/FlashProductsRoutes/flashproductcomment")
const ProductcemmentsRoutes = require("./routes/AllProductsRoutes/Productcomment")
const ThismonthcommentsRoutes = require("./routes/ThisMonthBestProductsRoutes/Thismonthcomment")
const WomenFashionCommentRoutes = require('./routes/WomenFashionProductsRoutes/WomenFashionComment')
const MensFashionCommentsRoutes = require('./routes/MensFashionProductsRoutes/MensFashionComments')

//Cuppon Route
const CupponRoute = require('./routes/Cuppon/Cuppon')

//BillingDetailsRoute
const UserBillingDetailsRoute = require('./routes/BillingDetailsOfUsers/UserBillingData')

const mongoose = require('./db');

dotenv.config();

const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/sessions',
  collection: 'sessions'
});

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'EcommorceSignup';
const app = express();
const port = 3000;


const cors = require('cors');

store.on('error', function (error) {
  console.log(error);
});

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
}));
app.use(bodyParser.json());
// app.use(session({ secret: '8f8cf9d5b54eb1e3f8a3d637f0b2d9f1', resave: false, saveUninitialized: true ,cookie: { secure: true}}));
app.use(passport.initialize());

// app.use(session({
//   secret: '8f8cf9d5b54eb1e3f8a3d637f0b2d9f1',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     sameSite: 'strict', // Set to true if using HTTPS
//     maxAge: 24 * 60 * 60 * 1000 // 24 hours
//   },
//   store: store
// }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: false, // Set to true only if using HTTPS
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// app.use(session({
//   secret: 'your-secret',
//   resave: false,
//   saveUninitialized: true,
//   store: store,
//   cookie: {
//     secure: false, // Change to true if using HTTPS
//     sameSite: 'strict',
//   }
// }));

app.use((req, res, next) => {
  // console.log('Session:', req.session);
  next();
});
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());


app.use('/api', productRoutes);
app.use('/api', FlashProductRoutes);
app.use('/api', ThismonthRoutes);
app.use('/api', WomenFashionRoutes);
app.use('/api', MensFashionRoutes)
app.use('/api', FlashcartRoutes);
app.use("/api", DeleteProductRoutes);
app.use('/api', DeleteWishListProducts);
app.use('/api', ClearAllProductRoutes);
app.use('/api', UpdateCartRoutes);
app.use('/api', productcartRoutes);
app.use('/api', ThismonthscartRoutes);
app.use('/api', WomenFashionCartRoutes);
app.use('/api', MensFashionCartRoutes);
app.use('/api/Flashproducts', flashproductcommentRoutes);
app.use('/api/products', ProductcemmentsRoutes);
app.use('/api/Thismonth', ThismonthcommentsRoutes);
app.use('/api/WomenFashion', WomenFashionCommentRoutes);
app.use('/api/MensFashion', MensFashionCommentsRoutes)
app.use('/api', WomenFashionWishListRoutes);
app.use('/api', FlashWishlistRoutes)
app.use('/api', ThismonthWishlistRoutes)

//CupponRoute
app.use('/api', CupponRoute)

//BillingDetailsRoute
app.use('/api', UserBillingDetailsRoute)


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
    res.status(500).json({ success: false, message: 'Internal server error' });
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
        // Update existing user record if necessary
        await collection.updateOne(
          { email },
          { $set: { username: displayName } }
        );
      } else {
        // Insert new user record if not found
        await collection.insertOne({ username: displayName, email });
      }

      // Create or update user database
      const userDb = client.db(userDbName);
      const userCollection = userDb.collection('UserData');
      const userDbExists = await client.db(userDb.databaseName).listCollections({ name: 'UserData' }).hasNext();

      if (!userDbExists) {
        await userCollection.insertOne({ username: displayName, email });
      }

      res.redirect('http://localhost:5173/home');
      // res.redirect(`${process.env.FRONTEND_URL}/home`)
    } catch (error) {
      console.error('Error in Google OAuth callback:', error);
      res.redirect('/signup');
    }
  }
);


app.get('/api/auth/session', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// app.get('/api/auth/session', (req, res) => {
//   if (req.session.user && req.session.user.otpVerified ) {
//     res.json({ user: req.session.user });
//   } else {
//     res.status(401).json({ message: 'Not authenticated' });
//   }
// });

// app.get('/api/auth/session', verifyToken, (req, res) => {
//   if (req.user) {
//     res.json({ user: req.user });
//   } else {
//     res.status(401).json({ message: 'Not authenticated' });
//   }
// });




app.get('/api/auth/signout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ message: 'Logout error' });
    }
    res.redirect('/signup');
  });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

