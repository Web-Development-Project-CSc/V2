const productSchema= new mongoose.Schema({
    name:String,
    price:Number,
    numPurchases:Number,
    img:
    {
        data:Buffer,
        contenttype:String,
    },
    imgUrl:String
})
module.exports= mongoose.model('Product', productSchema)