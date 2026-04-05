const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    email : {
        typeof : String,
        unique : [true,"This email is already stored..."]
    },
    password : Number
})

const userModel = mongoose.model("User Hash", userSchema)

module.exports = userModel