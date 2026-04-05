const mongoose = require("mongoose")

const blackListSchema = new mongoose.Schema({
    token : String,
    require : [true, "token is required for blacklisting."]
},{
    timestamps: True
})

const blackListModel = mongoose.Model("BlackList", blackListSchema)

module.exports = blackListModel;
