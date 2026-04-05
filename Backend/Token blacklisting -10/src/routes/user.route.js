const authController = require('../controller/auth')
const authMiddleware = require('../middleware/authMiddleware')
const express = require('express')


const userRoute = express.Router();

userRoute.post('/register',authController.userCreation)

userRoute.post('/login',authController.userLoggin)

userRoute.post('/getMe/',authMiddleware.getMe. authController.getMe)

userRoute.get('/logout',authController.logOut)

