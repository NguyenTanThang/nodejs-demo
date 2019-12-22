const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    },
    admin: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("users", schema);