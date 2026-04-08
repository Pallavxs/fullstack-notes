const mongoose = require('mongoose')

const db = () => {
    mongoose.connect('mongodb+srv://aqua:7IpGkCyX53X9Raf1@cluster0.hvnoz1f.mongodb.net/API')
    .then(()=>{
        console.log('database is connected')
    })
}

module.exports = db