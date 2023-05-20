const productSchema= new mongoose.Schema({
    name:String,
    price:Number,
    numPurchases:Number,
    imgUrl:String
})
module.exports= mongoose.model('Product', productSchema)