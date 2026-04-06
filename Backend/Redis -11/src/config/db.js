const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.Mongo_Link).then(()=>{
        console.log("database is connected...")
    })
}

module.exports = connectToDb