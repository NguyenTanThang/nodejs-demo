const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("blogs", schema);