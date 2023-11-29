const mongoose = require("mongoose")
const dressSchema = mongoose.Schema({
    dress_type: {type:String,required:true},
    size: {type:String,required:true},
    cost: {type:Number,required:true,min:0,max:500}
})
module.exports = mongoose.model("dress",dressSchema)