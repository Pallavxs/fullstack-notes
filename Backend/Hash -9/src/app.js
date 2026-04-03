require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require("express")
const app = express()

const userRoute = require('./routes/user.route')

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', userRoute)

module.exports = app;