const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const WomenFashion = require('../../models/WomenFashion');
const Product = require('../../models/Thismonth');


router.post('/addToThismonthWishList', async (req, res) => {
    try {
        const { email, productId, offerPrice, discription, quantity, size } = req.body; // Ensure you get productId and quantity from the request body
        
        // Validate the input
        if (!email || !productId || !offerPrice || !quantity || !size) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        if (Array.isArray(size)) {
            return res.status(400).json({ message: 'Size should be a single value' });
        }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Connect to user's specific database
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize user database name
        const userDb = mongoose.connection.useDb(userDbName);
        const WishListCollection = userDb.collection('WishList');

        // Check if product already exists in cart
        const existingCartItem = await WishListCollection.findOne({ productId });
        if (existingCartItem) {
            // Update quantity if product already exists in cart
            await WishListCollection.updateOne(
                { productId },
                { $inc: { quantity } }
            );
        } else {
            // Add new product to cart
            await WishListCollection.insertOne({ 
                productId, 
                quantity, 
                size, // Ensure the size is stored as a single value
                ...product.toObject() 
            });
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});



router.get('/getToThismonthWishList/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const WishListCollection = userDb.collection('WishList');

        const wishlistItems = await WishListCollection.find({}).toArray();
        res.status(200).json(wishlistItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
