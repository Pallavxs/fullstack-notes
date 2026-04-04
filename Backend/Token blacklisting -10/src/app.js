require('dotenv').config()
const cookieParser = require('cookie-parser')
const express = require('express')
const userRoute = require('./routes/user.route')

const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', userRoute)
module.exports = app;