const mongoose = require('mongoose')

const db = () => {
    mongoose.connect('mongodb+srv://viratd918_db_user:virat@cluster0.0rpr6m9.mongodb.net/Mydbname')
    .then(()=>{
        console.log('database is connected')
    })
}

module.exports = db