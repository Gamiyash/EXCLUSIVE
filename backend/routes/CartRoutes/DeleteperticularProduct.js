const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.delete('/deleteflashCartItem/:email/:productId', async (req, res) => {
    try {
        const { email, productId } = req.params;
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const cartCollection = userDb.collection('cart');
        const checkoutCollection = userDb.collection('checkout');

        const deleteResult = await cartCollection.deleteOne({ productId });
        const deleteCheckoutdata = await checkoutCollection.deleteOne({ productId });

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        if (deleteCheckoutdata.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found in cart" })
        }

        res.status(200).json({ message: 'Product deleted from cart successfully' });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;