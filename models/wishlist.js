const mongoose = require('mongoose')
const wishlistSchema = new mongoose.Schema({
    product:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"products"
        },
        productName:String,
        customer:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"accounts"
            },
}, {timestamps:true})
module.exports = mongoose.model('favorites', wishlistSchema)