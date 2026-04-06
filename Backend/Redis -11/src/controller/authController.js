const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const redis = require('../model/blacklist')

async function register(req, res) {
    const {username, email, password} = req.body;

    const isEmailExist = await userModel.findOne({ email })

    if(isEmailExist){
        res.status(409).json({
            message : "email is already taken"
        })
    }

    const hasPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username, email, password : hasPassword
    });
    
    const token = jwt.sign({
        id : user._id,
        email : user.email,
        username : user.username
    }, process.env.JWT_SECRET )

    cookie('token', token)

    res.status(200).json({
        message : "user successfully registerd",
        user 
    })

}

async function login(req, res) {
    const { email, password } = req.body

    const user = userModel.findOne({ email })

    if (!user) {
        res.status(401).json({
            message : "Invalid credentials"
        })
    }

    const userVerified = bcrypt.compare(password, user.password)

    if(!userVerified){
        res.status(401).json({
            message : "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id : user._id,
        username : user.username,
        email : user.email
    })

    cookie("token", token)

    res.status(200).json({
        message: "user logged in ----",
        user
    })
}

async function logout(req,res) {
    const token = req.cookies.token
    
    if(!token){
        res.status(409).json({
            message : "token not found"
        })
    }

    res.clearCookie(token)

    redis.set(token,Date.now().toString())
}

async function getMe(req,res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message : "user fetched successfully",
        user
    })

    
}
module.exports = { register, login, logout, getMe }