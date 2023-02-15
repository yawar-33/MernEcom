const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, require: true, max: 30
    },
    lastName: {
        type: String, require: true, max: 30
    },
    userName: {
        type: String, require: true, unique: true, lowercase: true,
    },
    email: {
        type: String, require: true, unique: true, lowercase: true
    },
    password: {
        type: String, require: true,
    },
    role: {
        type: String, enum: ["user", "admin", "super-admin"], default: "user"
    },
    contactNumber: { type: String },
    profilePicture: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("user", userSchema)