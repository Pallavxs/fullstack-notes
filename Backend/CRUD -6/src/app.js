const express = require("express");
const app = express();
const blogModel = require("./models/model")

app.use(express.json());

app.post('/create', async (req,res) => {
    const {title, description}  = req.body

    const notes = await blogModel.create({
        title, description
    })

    res.status(201).json({
        message: "Blog is sucessfully created...",
        notes
    })

    console.log("Blog is created ...")

})

app.get('/get', async (req, res) => {
    const notes = await blogModel.find()

    res.status(200).json({
        message: "Blog received sucessfully...",
        notes
    })

})

module.exports = app