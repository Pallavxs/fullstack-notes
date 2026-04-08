const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : String,
    email : {
        type : String,
        unique : [true,"This email is already stored..."]
    },
    password : String
})

const userModel = mongoose.model("User Hash", userSchema)

module.exports = userModel