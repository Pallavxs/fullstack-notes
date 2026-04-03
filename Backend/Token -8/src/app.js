require('dotenv').config()

const express = require("express")
const cookieParser = require('cookie-parser')
const connectToDb = require('./config/configdatabase')

const app = express()
const authRouter = require('./routes/authroute')

app.use(express.json());
app.use(cookieParser())
connectToDb()
app.use("/api/auth",authRouter)




module.exports = app;