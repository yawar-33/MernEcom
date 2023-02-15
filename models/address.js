const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    address1: {
        type: String,
        required: true
    },
    address12: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String, required: true
    },
    zipCode: {
        type: String, required: true
    },
    addressType: {
        type: String,
        required: true,
        enum: ["home", "work"],
    },
});

const userAddressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    address: [addressSchema]
}, { timestamps: true });

// mongoose.model("address", addressSchema);
module.exports = mongoose.model("userAddress", userAddressSchema);