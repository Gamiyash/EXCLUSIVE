const mongoose = require('mongoose');

// Define Product Schema (Embedded in Order)
const productSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId, // Assuming product references another collection
        ref: 'Product', // Reference to the Product collection
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true,
        default: function () {
            return this.quantity * this.price; // Calculate total price of the product
        }
    }
});

// Define Order Schema
const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    products: [productSchema], // Embedding the product schema
    amount: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    customerDetails: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    }
});

const getOrderModel = (dbConnection) => {
    return dbConnection.model('Order', orderSchema);
};
// const Order = mongoose.model('Order', orderSchema);


module.exports = getOrderModel;
// module.exports = Order;
