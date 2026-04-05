const express = require('express')
const app = express()
const db = require('./config/db')

db()

module.exports = app;