const mongoose = require('mongoose')

const db = () => {
    mongoose.connect('mongodb+srv://aqua:aqua123@cluster0.hvnoz1f.mongodb.net/mydb')
    .then(()=>{
        console.log('database is connected')
    })
}

module.exports = db