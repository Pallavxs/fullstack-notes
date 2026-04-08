import userModel from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import cookie from 'cookie-parser';

export async function register(req, res) {
    const { username, email, password} = req.body;

    const verifiedUser = await userModel.findOne({ $or: [
        {username},
        {email}
    ]})

    if(verifiedUser){
        res.status(409).json({
            message: "user's username or email is already exist"
        })
    }

    const hashPass = await bcrypt.hash(password,10)

    const user = await userModel.create({
        username, email, password : hashPass
    })

    const token = jwt.sign({
        id : user._id
    }, config.JWT_SECRET)

    res.cookie('token', token)
    
    res.status(200).json({
        message : "User registered sucessfully",
        user : user,
        token
    })

}

export async function getMe(req, res) {
    const token = req.headers.authorization?.split(" ")[ 1 ]; 

    console.log(token)

    if(!token){
        return res.status(401).json({
            message : "Token not found"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id)
    
    res.status(200).json({
        message : "User fetched sucessfully",
        user : user
    })
}