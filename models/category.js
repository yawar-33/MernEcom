const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    slug: {
        type: String, required: true
    },
    type: {
        type: String
    },
    image: {
        type: String
    },
    parentId: { type: String },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
    }
}, { timestamps: true });
module.exports = mongoose.model("category", categorySchema)