const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../model/userModel')
const userRoute = express.Router();

userRoute.post('/register', async (req,res) => {
    const {username , email, password} = req.body

    const emailIsAlreadyRegisterd = await userModel.findOne({ email })

    if (emailIsAlreadyRegisterd) {
        return res.status(409).json({
            message : "user email is already existed"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10) 

    const user = await userModel.create({
        username, email, password : hashPassword
    })

    const Token = jwt.sign({
        id : user._id,
        email : user.email
    }, process.env.JWT_Secret)

    res.cookie("Cookie", Token)

    res.status(201).json({
        message : 'user is sucessfully registerd',
        user
    })
})

userRoute.get('/login', async (req,res) => {
    const { email, password }  = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        res.status(404).json({
            message : "User not found"
        })
    }

    isMatch = bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(401).json({
            message : "Unauthorized access is not accecptable"
        })
    }

    const token = jwt.sign({
        email : user.email,
        password : user.password
    }, process.env.JWT_Secret)

    res.cookie("token", token)

    res.status(200).json({
        message : "User logged in",
        user 
    })
})

module.exports = userRoute