const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        typeof : String,
        required : [true,"username is required"],
        unique : [true, "username must be unique"]
    },
    email : {
        typeof : String,
        required : [true, "email is required"],
        unique : [true, "email must be unique"]
    },
    password : {
        typeof : String,
        required : [true, "password is needed"],
        unique : [true, "password must be unique"],
        Select : false
    } 
});

const userModel = mongoose.model('userData', userSchema);

module.exports = userModel;