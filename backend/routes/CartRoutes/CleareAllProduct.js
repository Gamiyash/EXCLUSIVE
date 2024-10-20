const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.delete('/clearCart/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        const userDbName = userEmail.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const cartCollection = userDb.collection('cart');
        const checkoutCollection = userDb.collection('checkout');

        // Delete all items from the cart associated with the user's email
        await cartCollection.deleteMany({});
        await checkoutCollection.deleteMany({});

        res.status(200).json({ message: 'All items cleared from cart' });
    } catch (err) {
        console.error('Error clearing cart:', err);
        res.status(500).json({ error: 'Failed to clear cart' });
    }
});

module.exports = router;