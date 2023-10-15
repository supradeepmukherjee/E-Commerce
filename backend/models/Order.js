const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pincode: {
            type: Number,
            required: true,
            maxLength: [6, "Pincode must be of 6 digits"],
            minLength: [6, "Pincode must be of 6 digits"]
        },
        phone: {
            type: Number,
            required: true,
            maxLength: [10, "Pincode must be of 10 digits"],
            minLength: [10, "Pincode must be of 10 digits"]
        }
    },
    orderedItems: [{
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        product: {
            type: mongoose.Schema.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'UserEcom',
        required: true
    },
    paymentInfo: {
        id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
    },
    paidAt: {
        type: Date,
        required: true
    },
    itemsSubtotal: {
        type: Number,
        default: 0,
        required: true
    },
    tax: {
        type: Number,
        default: 0,
        required: true
    },
    shippingCharge: {
        type: Number,
        default: 0,
        required: true
    },
    amt: {
        type: Number,
        default: 0,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Processing"
    },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', orderSchema)