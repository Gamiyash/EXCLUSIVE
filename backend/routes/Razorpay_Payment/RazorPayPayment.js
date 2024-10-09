const Razorpay = require('razorpay');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mongoose = require('mongoose');
const { MongoClient,ObjectId } = require('mongodb');
const getOrderModel = require('../../models/Orderschema')
// const Order = require('../../models/Orderschema')


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

            const url = process.env.MONGO_URI;
            const client = new MongoClient(url);
            await client.connect();
            const dbName = 'EcommorceSignup';
            const db = client.db(dbName);
            const collection = db.collection('Orders');

            // Connect to user's specific database
            const userDbName = email.replace(/[^a-zA-Z0-9_]/g, '_'); // Sanitize user database name
            const userDb = mongoose.connection.useDb(userDbName);
            const cartCollection = userDb.collection('cart')
            const checkoutCollection = userDb.collection('checkout');
            const billingCollection = userDb.collection('billingDetails'); // Get billing details collection

            const checkoutItems = await checkoutCollection.find({}).toArray();

            if (checkoutItems.length === 0) {
                return res.status(400).json({ message: 'No items found in checkout' });
            }

            // Retrieve customer billing details
            const billingDetails = await billingCollection.findOne({ email });

            if (!billingDetails) {
                return res.status(400).json({ message: 'Billing details not found' });
            }


            const orderData = {
                orderId: order_id, // Use the Razorpay order ID as the order ID
                email: billingDetails.emailAddress,
                products: checkoutItems.map(item => ({
                    productId: item.productId,
                    name: item.name,
                    image: item.image,
                    quantity: item.quantity,
                    price: item.offerPrice,
                    type: item.type,
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
                createdAt: new Date()
            };

            // Insert the order into the MongoDB Orders collection
            await collection.insertOne(orderData)

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
        const url = process.env.MONGO_URI;
        const client = new MongoClient(url);
        await client.connect();
        const dbName = 'EcommorceSignup';
        const db = client.db(dbName);
        const collection = db.collection('Orders');

        // Retrieve orders for the user by filtering with email
        const orders = await collection.find({ email }).toArray();

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
    const { email, orderId } = req.params;
    try {
        const url = process.env.MONGO_URI;
        const client = new MongoClient(url);
        await client.connect();
        const dbName = 'EcommorceSignup';
        const db = client.db(dbName);
        const collection = db.collection('Orders');

        // Retrieve a specific order by email and orderId
        const order = await collection.findOne({ email, orderId });

        if (order.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.get('/getOrdersForAdmin', async (req, res) => {
    try {
        const url = process.env.MONGO_URI;;
        const client = new MongoClient(url);
        const dbName = 'EcommorceSignup'
        const db = client.db(dbName);
        const collection = db.collection('Orders');

        // Retrieve all orders for this user
        const orders = await collection.find({}).toArray();

        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

router.get('/salesData', async (req, res) => {
    try {
        const url = process.env.MONGO_URI;
        const client = new MongoClient(url);
        await client.connect(); // Ensure you connect to the database
        const dbName = 'EcommorceSignup';
        const db = client.db(dbName);
        const collection = db.collection('Orders');

        const salesData = await collection.aggregate([
            {
                $unwind: "$products"  // Deconstruct the products array
            },
            {
                $group: {
                    _id: "$products.type", // Group by product type
                    sales: {
                        $sum: {
                            $multiply: ["$products.price", "$products.quantity"] // Multiply price and quantity
                        }
                    }
                }
            },
            {
                $project: {
                    category: "$_id",
                    sales: 1,
                    _id: 0
                }
            }
        ]).toArray();


        await client.close(); // Close the connection
        res.status(200).json(salesData); // Send response
    } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/totalRevenue', async (req, res) => {
    try {
        const client = new MongoClient(process.env.MONGO_URI);
        const dbName = 'EcommorceSignup';
        const db = client.db(dbName);
        const collection = db.collection('Orders');

        const totalRevenue = await collection.aggregate([
            { $unwind: "$products" }, // Unwind the products array
            {
                $group: {
                    _id: null, // No grouping, calculate for all orders
                    totalRevenue: {
                        $sum: {
                            $multiply: ["$products.price", "$products.quantity"]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0, // Exclude _id from the result
                    totalRevenue: 1
                }
            }
        ]).toArray();

        res.status(200).json(totalRevenue[0] || { totalRevenue: 0 }); // Send total revenue
    } catch (error) {
        console.error("Error calculating total revenue:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/monthlyRevenue', async (req, res) => {
    try {
        const url = process.env.MONGO_URI;
        const client = new MongoClient(url);
        await client.connect();
        const dbName = 'EcommorceSignup';
        const db = client.db(dbName);
        const collection = db.collection('Orders');

        // Ensure `createdAt` exists and is a valid date
        const revenueData = await collection.aggregate([
            {
                $match: { createdAt: { $exists: true, $type: "date" } } // Ensure only documents with valid dates are processed
            },
            {
                $group: {
                    _id: { $month: "$createdAt" }, // Group by month
                    totalRevenue: { $sum: "$amount" } // Adjust the field name based on your schema
                }
            },
            {
                $sort: { _id: 1 } // Sort by month
            }
        ]).toArray(); // Add `.toArray()` to convert the aggregation result to an array

        res.json(revenueData);
    } catch (error) {
        console.error("Error fetching monthly revenue:", error);
        res.status(500).json({ message: 'Error fetching monthly revenue', error });
    }
});

router.put('/orders/:id/status', async (req, res) => {
    const { id } = req.params; // Get the ID from the request parameters
    const { status } = req.body; // Get the new status from the request body

    try {
        const url = process.env.MONGO_URI; // Your MongoDB connection string
        const client = new MongoClient(url);
        await client.connect();
        const dbName = 'EcommorceSignup';
        const db = client.db(dbName);
        const collection = db.collection('Orders');

        // Convert id to ObjectId
        const objectId = new ObjectId(id); // Correctly convert string ID to ObjectId

        // Update the status field
        const updatedOrder = await collection.updateOne(
            { _id: objectId }, // Find the document by _id
            { $set: { status } }, // Update the status field
            { upsert: false } // Do not create a new document if it doesn't exist
        );

        if (updatedOrder.matchedCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } 
});





module.exports = router;
