const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.put('/updateCart', async (req, res) => {
    try {
        const { email, productId, quantity, size } = req.body;

        if (!email || !productId || !quantity || !size) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const cartCollection = userDb.collection('cart');

        // Check if the product exists in the cart
        const existingCartItem = await cartCollection.findOne({ productId });
        if (!existingCartItem) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Update only the fields that have changed (quantity, size)
        await cartCollection.updateOne(
            { productId },
            { 
                $set: { size }, 
                $inc: { quantity: quantity - existingCartItem.quantity } // Only change the difference in quantity
            }
        );

        res.status(200).json({ message: 'Cart updated successfully' });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


module.exports = router;