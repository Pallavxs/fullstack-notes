const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect('mongodb+srv://aqua:ePFlJbDMGCT6mTr3@crud.ip7lvuq.mongodb.net/Integration')
    .then(()=>{
        console.log('Database is connected ...')
    })
}

module.exports = connectToDb