const mongoose = require("mongoose")

const connectToDb = () => {
    mongoose.connect(process.env.Mongo_Link).then(()=>{
        console.log("server is running")
    })
}

module.exports = connectToDb;