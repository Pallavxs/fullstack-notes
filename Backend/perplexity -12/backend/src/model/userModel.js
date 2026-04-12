import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    username: {
        type : String,
        required : true,
        trim : true,
        unqiue : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
    },
    verified : {
        type: Boolean,
        default : false
    }
}, {
    Timestamp: true
});

userSchema.pre('save', async function () {
    if(!this.isModified('password')) {
    }
    
    this.password = bcrypt.hash(this.password,10)
});

userSchema.methods.comparePassword = function (candidatePassword){
    return bcrypt.compare(candidatePassword,this.password)
}

const userModel = mongoose.model('user',userSchema)

export default userModel;