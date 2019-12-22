const mongoose = require("mongoose");
const {MONGODB_URI} = require("./config");

mongoose.connect(MONGODB_URI, 
    {useUnifiedTopology: true, useNewUrlParser: true}
    ,(err) => {
    if (err) {
        return console.log(err);
    }
    console.log("Establish connection to database");
})

