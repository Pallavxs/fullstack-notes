const mongoose = require('mongoose')

function connectToDb() {
    mongoose.connect(process.env.Db_link)
    .then(()=>{
        console.log('Database is connected ...')
    })
}

module.exports = connectToDb