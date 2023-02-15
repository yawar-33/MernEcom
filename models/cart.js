const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    items: [CartItemSchema],
});

module.exports = mongoose.model('cart', cartSchema);