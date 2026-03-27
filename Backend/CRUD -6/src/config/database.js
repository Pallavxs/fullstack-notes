const mongoose = require('mongoose')

const Direct_Use = process.env.Mongo_Link 

function connectToDb() {
    mongoose.connect(Direct_Use)
    .then(()=>{
        console.log("Database is connected sucessfully...")
    })
}

module.exports = connectToDb
