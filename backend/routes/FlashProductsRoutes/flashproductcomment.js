const express = require('express');
const router = express.Router();
const FlashProduct = require('../../models/Flashproduct'); // Adjust path as needed

// Fetch product details
router.get('/:id', async (req, res) => {
    try {
        const product = await FlashProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch comments for a product
router.get('/:id/comments', async (req, res) => {
    try {
        const product = await FlashProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product.comments || []);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Post a new comment
router.post('/:id/comments', async (req, res) => {
    try {
        const { email, comment } = req.body;
        const product = await FlashProduct.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const newComment = { email, comment, createdAt: new Date() };
        product.comments = product.comments || [];
        product.comments.push(newComment);

        await product.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id/comments/:commentId', async (req, res) => {
    try {
        const { id, commentId } = req.params;
        const product = await FlashProduct.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const commentIndex = product.comments.findIndex(comment => comment._id.toString() === commentId);
        if (commentIndex === -1) return res.status(404).json({ message: 'Comment not found' });

        product.comments.splice(commentIndex, 1);
        await product.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;


