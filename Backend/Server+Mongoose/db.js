const mongoose = require('mongoose')

const database = mongoose.connect('mongodb+srv://pallavshrivastava84_db_user:MGseCwhHk3RfKmhJ@cluster0.bgc1gpt.mongodb.net/').then(()=>{
    console.log("Database is connected...")
})

module.exports = database;