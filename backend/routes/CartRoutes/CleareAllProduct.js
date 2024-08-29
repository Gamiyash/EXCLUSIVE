const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


router.delete('/clearCart/:email', async (req, res) => {
    const userEmail = req.params.email;
    try {
        const userDbName = userEmail.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const cartCollection = userDb.collection('cart');

        // Delete all items from the cart associated with the user's email
        await cartCollection.deleteMany({});

        res.status(200).json({ message: 'All items cleared from cart' });
    } catch (err) {
        console.error('Error clearing cart:', err);
        res.status(500).json({ error: 'Failed to clear cart' });
    }
});


// router.delete('/deleteflashCartItem/:email/:productId', async (req, res) => {
//     try {
//         const { email, productId } = req.params;
//         const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_');
//         const userDb = mongoose.connection.useDb(userDbName);
//         const cartCollection = userDb.collection('cart');

//         const deleteResult = await cartCollection.deleteOne({ productId });

//         if (deleteResult.deletedCount === 0) {
//             return res.status(404).json({ message: 'Product not found in cart' });
//         }

//         res.status(200).json({ message: 'Product deleted from cart successfully' });
//     } catch (error) {
//         console.error('Error deleting product from cart:', error);
//         res.status(500).json({ message: 'Internal server error', error: error.message });
//     }
// });


module.exports = router;