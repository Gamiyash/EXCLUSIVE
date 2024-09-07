const express = require('express');
const router = express.Router();

// Example coupon data
const coupons = [
    { code: "DISCOUNT10", discount: 10 },  // 10% off
    { code: "DISCOUNT15", discount: 15 },  // 15% off
    { code: "DISCOUNT20", discount: 20 }   // 20% off
];

// Route to get available coupons
router.get('/getCoupons', (req, res) => {
    res.json(coupons);  // Send coupon data as response
});

module.exports = router;
