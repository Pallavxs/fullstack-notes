const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is require"],
        unique: [true, "username must be unique"]
    },
    email : {
        type : String,
        required : [true, "email is require"],
        unique : [true, "email must be unique"]
    },
    password : {
        type : String,
        required : [true, "password is require"],
        select : false
    }
}, {
    timestamps : true
});

const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel;