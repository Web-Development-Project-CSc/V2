const productSchema= new mongoose.Schema({
    name:String,
    price:Number,
    numPurchases:Number,
    imgUrl:String,
}, {timestamps:true})
module.exports= mongoose.model('Product', productSchema)