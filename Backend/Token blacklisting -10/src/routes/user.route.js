const authController = require('../controller/auth')
const authMiddleware = require('../middleware/authMiddleware')
const express = require('express')


const userRoute = express.Router();

userRoute.post('/register',authController.register)

userRoute.post('/login',authController.login)

userRoute.post('/getMe/',authMiddleware.getMe , authController.getMe)

userRoute.get('/logout',authController.logOut)

module.exports = userRoute