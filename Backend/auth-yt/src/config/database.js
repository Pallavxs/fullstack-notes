import mongoose from "mongoose";
import config from "./config.js";

function connectToDb (){
    mongoose.connect(config.MONGO_LINK).then(()=>{
        console.log("data is connected")
    })
}

export default connectToDb;