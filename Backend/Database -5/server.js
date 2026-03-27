/* 
- server ko start karna
- databse se connect karna 
*/

const app = require('./src/app')
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect("mongodb+srv://pallavshrivastava84_db_user:MGseCwhHk3RfKmhJ@cluster0.bgc1gpt.mongodb.net/dataStarting")
    .then(()=>{console.log("Connected to Database")})
}

connectToDb()

app.listen(3000,()=>{console.log("Server us running on port 3000...")})