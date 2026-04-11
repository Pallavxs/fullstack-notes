import config from "./config.js";
import mongoose from "mongoose";

function connectToDb() {
    mongoose.connect(config.MONGO_URI).then(() => {
        console.log("Database is connected")
    })
}

export default connectToDb;