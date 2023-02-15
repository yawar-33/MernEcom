const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const productSchema = new mongoose.Schema({
    name: {
        type: String, require: true
    },
    slug: {
        type: String, require: true, unique: true
    },
    price: {
        type: Number, require: true
    },
    quantity: {
        type: Number, require: true
    },
    description: {
        type: String, required: true
    },
    offer: {
        type: Number
    },
    pictures: [{
        img: { type: String }
    }],
    reviews: [reviewSchema],
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category', required: true },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    }
}, { timestamps: true });



module.exports = mongoose.model('product', productSchema)
