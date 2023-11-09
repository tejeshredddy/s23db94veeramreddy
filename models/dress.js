const mongoose = require("mongoose")
const dressSchema = mongoose.Schema({
    dress_type: String,
    size: String,
    cost: Number
})
module.exports = mongoose.model("dress",
dressSchema)