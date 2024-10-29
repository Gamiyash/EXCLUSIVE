const express = require('express');
const router = express.Router();
const Product = require('../../models/product');

router.post('/add-products', async (req, res) => {
    const { name,
        image,
        sideimg1,
        sideimg2,
        sideimg3,
        offerPrice,
        actualPrice,
        discount,
        rating,
        type,
        keyword,
        discription,
        size } = req.body;

    const AddProducts = new Product({
        name,
        image,
        sideimg1,
        sideimg2,
        sideimg3,
        offerPrice,
        actualPrice,
        discount,
        rating,
        type,
        keyword,
        discription,
        size
    })
    try {
        const saveProducts = await AddProducts.save();
        res.status(201).json(saveProducts)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})



module.exports = router;