const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mongoose = require('mongoose');
const getOrderModel = require('../../models/Orderschema')


router.use(bodyParser.json());

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay Key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET // Replace with your Razorpay Secret Key
});

router.post('/createOrder', async (req, res) => {
    const { amount, currency } = req.body;

    const options = {
        amount: amount * 100, // Convert to paise
        currency,
        receipt: 'order_rcptid_11'
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/verifyPayment', async (req, res) => {
    const { order_id, payment_id, signature, email, quantity } = req.body;

    if (!order_id || !payment_id || !signature) {
        return res.status(400).json({ message: 'Missing required fields for payment verification' });
    }

    try {
        // Verify Razorpay Signature
        const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${order_id}|${payment_id}`)
            .digest('hex');

        if (generatedSignature === signature) {
            // Payment verified successfully
            // console.log('Payment verified successfully');

            // Connect to user's specific database
            const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize user database name
            const userDb = mongoose.connection.useDb(userDbName);
            const cartCollection = userDb.collection('cart')
            const checkoutCollection = userDb.collection('checkout');
            const billingCollection = userDb.collection('billingDetails'); // Get billing details collection
            const Order = getOrderModel(userDb);
            // Retrieve all items from the checkout collection
            const checkoutItems = await checkoutCollection.find({}).toArray();

            if (checkoutItems.length === 0) {
                return res.status(400).json({ message: 'No items found in checkout' });
            }

            // Retrieve customer billing details
            const billingDetails = await billingCollection.findOne({ email });

            if (!billingDetails) {
                return res.status(400).json({ message: 'Billing details not found' });
            }

            // Create a new order with the items in the checkout collection and customer details
            const newOrder = new Order({
                orderId: order_id, // Use the Razorpay order ID as the order ID
                products: checkoutItems.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.offerPrice,
                    total: item.quantity * item.offerPrice,
                })),
                amount: checkoutItems.reduce((acc, item) => acc + (item.quantity * item.offerPrice), 0), // Total amount
                customerDetails: {
                    name: billingDetails.firstName,
                    email: billingDetails.emailAddress,
                    address: `${billingDetails.streetAddress}, ${billingDetails.apartment || ''}, ${billingDetails.city}`,
                    phone: billingDetails.phoneNumber
                },
                status: 'Pending', // You can update the status as needed
                createdAt: new Date().toLocaleDateString()
            });



            // Save the order to the order collection
            await newOrder.save();

            // Optionally, clear the checkout collection after transferring data
            await checkoutCollection.deleteMany({});
            await cartCollection.deleteMany({});

            res.status(200).json({ message: 'Payment verified and order created successfully' });
        } else {
            res.status(400).send('Payment verification failed');
        }
    } catch (error) {
        console.error('Error during payment verification:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.get('/getOrders/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_');
        const userDb = mongoose.connection.useDb(userDbName);
        const Order = getOrderModel(userDb);

        // Retrieve all orders for this user
        const orders = await Order.find({});

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


router.get('/getOrders/:email/:orderId', async (req, res) => {
    const { email,orderId } = req.params;
    try {
        // Connect to user's specific database
        const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize user database name
        const userDb = mongoose.connection.useDb(userDbName);
        const Order = getOrderModel(userDb); // Ensure you have the order model for this user's DB

        // const { name, image, offerPrice, quantity, id,amount,status, } = req.body;
        // const newOrder = new getOrderModel(userDb)({
        //     name,
        //     image,
        //     offerPrice,
        //     quantity,
        //     id,
        // });

        // Retrieve all orders for the user
        const orders = await Order.find({orderId});

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});


module.exports = router;
