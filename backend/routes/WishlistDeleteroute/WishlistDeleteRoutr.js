const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.delete('/deleteWishlistItem/:email/:productId', async (req, res) => {
    try {
        const { email, productId } = req.params;
        console.log('DELETE request:', req.params);
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const cartCollection = userDb.collection('WishList');

        console.log('Deleting product with ID:', productId); // Log the productId

        const deleteResult = await cartCollection.deleteOne({ productId });
        console.log('Delete result:', deleteResult);

        if (deleteResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        res.status(200).json({ message: 'Product deleted from cart successfully' });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


module.exports = router;