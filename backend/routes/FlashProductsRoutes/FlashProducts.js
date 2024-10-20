const express = require('express');
const router = express.Router();
const FlashProduct = require('../../models/Flashproduct');

router.get('/Flashproducts', async (req, res) => {
    try {
        const Flashproducts = await FlashProduct.find();
        res.json(Flashproducts)

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
});

// Get a specific flash product by ID
router.get('/Flashproducts/:id', async (req, res) => {
    try {
        console.log('Fetching flash product with ID:', req.params.id);
        const product = await FlashProduct.findById(req.params.id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).json({ message: 'Product not found' });
        }
        console.log('Product fetched:', product);
        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error.message);
        res.status(500).json({ message: error.message });
    }
});


router.post('/Flashproducts', async (req, res) => {
    const { name, image, offerPrice, actualPrice, discount, rating, discription, size,sideimg1,sideimg2,sideimg3,sideimg4 } = req.body;
    const newFlashProduct = new FlashProduct({
        name,
        image,
        sideimg1,
        sideimg2,
        sideimg3,
        sideimg4,
        offerPrice,
        actualPrice,
        discount,
        rating,
        discription,
        size
    });
    try {
        const savedFlashProduct = await newFlashProduct.save()
        res.status(201).json(savedFlashProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;