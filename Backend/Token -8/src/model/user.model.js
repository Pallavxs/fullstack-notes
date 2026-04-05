const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email : {
        type : String,
        unique :  [true, "Email is already in use"],
    },
    phone_no : Number
})

const userModel = mongoose.model("userData",userSchema)

module.exports = userModel;