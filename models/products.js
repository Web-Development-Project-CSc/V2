const mongoose= require('mongoose');
const productSchema= new mongoose.Schema({
    name:{type: String , required:true},
    price:{type:Number , required:true},
    numPurchases:{type:Number , required:true},
    imgUrl:{type: String , required:true}
}, {timestamps:true})
module.exports= mongoose.model('products', productSchema)