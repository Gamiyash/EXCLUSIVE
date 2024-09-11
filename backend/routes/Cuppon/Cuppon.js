const express = require('express');
const router = express.Router();

// Example coupon data
const coupons = [
    { code: "SAVEON1", discount: 1 }, 
    { code: "THREEOFF", discount: 3 },  
    { code: "DOUBLEUP2", discount: 2 } ,
    { code: "LUCKY7DEAL", discount: 7 } ,
    { code: "BATTER_LUCK_NEXT_TIME", discount: 0 } ,
    { code: "TENFORWIN", discount: 10 } ,
    { code: "SIXBOOST", discount: 6 },
    { code: "BIGTHIRTY", discount: 30 }  
];

// Route to get available coupons
router.get('/getCoupons', (req, res) => {
    res.json(coupons);  // Send coupon data as response
});

module.exports = router;
