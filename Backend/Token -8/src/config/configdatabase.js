const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.Mongo_Link)
    .then(()=>{
        console.log('Database is running...')
    })
}

module.exports = connectToDb;

