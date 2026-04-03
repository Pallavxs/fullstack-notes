const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.Mongo_Link_compass)
    .then(()=>{
        console.log('Database is running...')
    })
}

module.exports = connectToDb;

