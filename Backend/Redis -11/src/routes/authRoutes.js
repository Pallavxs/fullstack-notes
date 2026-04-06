const express = require('express')
const userRoute = express.Router();
const authController = require("../controller/authController")
const authMiddleware = require("../middleware/authMiddleware")

userRoute.post('/register',authController.register)
userRoute.post('/login',authController.login)
userRoute.post('/logout',authController.logout)
userRoute.post('/get-me',authMiddleware.userAuth,authController.getMe)

module.exports = userRoute;