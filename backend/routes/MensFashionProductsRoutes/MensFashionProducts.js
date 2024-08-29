const express = require('express');
const router = express.Router();
const MensFashion = require("../../models/MensFashion")

router.get('/mensfashion', async (req, res) => {
    try {
        const MensFashionProducts = await MensFashion.find();
        res.json(MensFashionProducts)

    } catch (error) {
        res.status(500).json({ message: error.message });

    }
});

router.get('/mensfashion/:id', async (req, res) => {
    try {
        console.log('Fetching flash product with ID:', req.params.id);
        const product = await MensFashion.findById(req.params.id);
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

router.post('/mensfashion', async (req, res) => {
    const { name, image, offerPrice, actualPrice, discount, rating, discription, size, sideimg1, sideimg2, sideimg3, sideimg4 } = req.body;
    const newMensFashion = new MensFashion({
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
        const savedMensFashion = await newMensFashion.save()
        res.status(201).json(savedMensFashion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;