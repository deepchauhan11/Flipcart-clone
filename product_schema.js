const base = require("./mongo")
const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    },
    seller:{
        type:String,
        required:true
    },
    review_count:{
        type:Number
    },
    description:{
        type:String,
        required:true
    },
})

const product = mongoose.model("product",productSchema)

module.exports=product