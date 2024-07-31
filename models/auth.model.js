const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    lastname: {
        type: String,
        required: true // Removed unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    verification: {
        type: String,
        required: true
    },
});

module.exports = model("User", userSchema);