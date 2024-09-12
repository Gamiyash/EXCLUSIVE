const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../../models/product');


router.post('/addToCartallproduct', async (req, res) => {
    try {
        const { email, productId, offerPrice, discription, quantity, size } = req.body; // Ensure you get productId and quantity from the request body
        
        // Validate the input
        if (!email || !productId || !offerPrice || !quantity || !size) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // if (Array.isArray(size)) {
        //     return res.status(400).json({ message: 'Size should be a single value' });
        // }

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Connect to user's specific database
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize user database name
        const userDb = mongoose.connection.useDb(userDbName);
        const cartCollection = userDb.collection('cart');

        // Check if product already exists in cart
        const existingCartItem = await cartCollection.findOne({ productId });
        if (existingCartItem) {
            // Update quantity if product already exists in cart
            await cartCollection.updateOne(
                { productId },
                { $inc: { quantity } }
            );
        } else {
            // Add new product to cart
            await cartCollection.insertOne({ 
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

router.get('/getAllProductsCartData/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const cartCollection = userDb.collection('cart');

        const cartItems = await cartCollection.find({}).toArray();
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.post('/Checkout', async (req, res) => {
    try {
        const { email } = req.body; // Get email from the request body

        // Validate the input
        if (!email) {
            return res.status(400).json({ message: 'Missing email' });
        }

        // Connect to user's specific database
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize user database name
        const userDb = mongoose.connection.useDb(userDbName);
        const cartCollection = userDb.collection('cart');
        const checkoutCollection = userDb.collection('checkout');

        // Retrieve all items from the cart
        const cartItems = await cartCollection.find({}).toArray();

        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // For each cart item, either insert it into the checkout collection if it's new,
        // or update the quantity if it already exists
        for (const item of cartItems) {
            await checkoutCollection.updateOne(
                { productId: item.productId },  // Filter by product ID to check if item already exists in checkout
                {
                    $set: {
                        ...item,  // Update other details from the cart
                        size: item.size // Ensure size is updated properly if changed
                    },
                    // $inc: { quantity: item.quantity || 1 } // Increment quantity if the item already exists
                },
                { upsert: true }  // If the item doesn't exist, insert it (upsert)
            );
        }

        // Optionally, clear the cart after checkout
        // await cartCollection.deleteMany({});

        res.status(200).json({ message: 'Checkout successful, items moved to checkout' });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});



router.get('/getAllProductsCheckoutData/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const checkoutCollection = userDb.collection('checkout');

        const checkoutItems = await checkoutCollection.find({}).toArray();
        res.status(200).json(checkoutItems);
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});




module.exports = router;
