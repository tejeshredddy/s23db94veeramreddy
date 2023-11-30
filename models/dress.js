const mongoose = require("mongoose")
const dressSchema = mongoose.Schema({
    dress_type: {type:String,required:true},
    size: {type:String,required:true},
    cost: { type: Number,
        min: 1,
        max: 550
      }
})
module.exports = mongoose.model("dress",dressSchema)