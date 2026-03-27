const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String ,
    description: String ,
})

const blogModel = mongoose.model('notes',blogSchema)

module.exports = blogModel