const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userAddress.address",
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product",
            },
            payablePrice: {
                type: Number,
                required: true,
            },
            purchasedQty: {
                type: Number,
                required: true,
            },
        },
    ],
    paymentType: {
        type: String,
        enum: ["cod", "card"],
        required: true,
    },
    orderStatus: [
        {
            type: {
                type: String,
                enum: ["ordered", "packed", "shipped", "delivered"],
                default: "ordered",
            },
            date: {
                type: Date,
            },
            isCompleted: {
                type: Boolean,
                default: false,
            },
        },
    ],

}, { timestamps: true });

module.exports = mongoose.model("order", orderSchema);