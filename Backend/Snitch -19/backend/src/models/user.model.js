import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    contact: { type: String, required: false, sparse: true },
    email: { type: String, required: true, sparse: true },
    password: { 
        type: String, 
        required: function() {
            return !this.googleId; 
        }
    },
    fullname: { type: String, required: true },
    role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' },
    googleId: { type: String},
}, { timestamps: true });

userSchema.pre('save', async function () {
    if(!this.isModified('password')) return

    const encryptedPassword = await bcrypt.hash(this.password, 10);
    this.password = encryptedPassword;
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const userModel = mongoose.model("user", userSchema);

export default userModel;