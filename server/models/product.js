const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  image:String,
  title:String,
  discription:String,
  category:String,
  brand:String,
  price:Number,
  salePrice:Number,
  totalStock:Number
},{timestamps:true})

module.exports=mongoose.model("Product",productSchema)