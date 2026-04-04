const userModel = require('../model/user.model');
const express = require('express')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const bcrypt = require('bcrypt')


async function userCreation(req, res){
    const {username, email, password } = req.body

    const isEmailExist = await userModel.findOne({ email })

    if(isEmailExist){
        res.status(201).json({
            message : "email is already registerd"
        })
    }

    const hashPass = bcrypt.hash(password,10)

    const user = await userModel.create({
        username, email, password : hashPass
    })

    const token = jwt.sign({
        id : user._id,
        email: user.email
    },process.env.JWT_Sign)

    cookie("token", token)

    res.status(201).json({
        message: "User is registerd",
        user
    })

}


async function userLoggin(req,res){
    const { email , password} = req.body;

    const user = await userModel.findOne({ email })

    if(!user) {
        req.status(401).json({
            message: "Invalid credentials"
        })
    }

    const verifiesPass = await bcrypt.compare(password, user.password)

    if(!verifiesPass){
        req.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id : user._id,
        email : user.email
    },process.env.JWT_Sign)

    cookie("token", token)

    res.status(200).json({
        message: "user successfully registerd",
        user
    })
}

module.exports = {userCreation, userLoggin}