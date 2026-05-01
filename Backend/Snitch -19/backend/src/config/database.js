import mongoose from "mongoose";
import { config } from "./config.js";

export function connectToDb() {
    mongoose.connect(config.MONGO_URI)
    .then(()=> {
        console.log("Mongo Database is connected to server")
    })
}