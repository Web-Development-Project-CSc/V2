const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    status: {
        type:{
        name:String,
        imgNum:Number,
        },
        default:{
            name:"Placed",
            imgNum:0
        }
    },
    delivered:{
        type: Boolean,
        default: false
    },
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
            customerName:String,
            form:String,
            shade:String,
            quantity:{
                type:Number,
                default:1
            },
}, {timestamps:true})
module.exports = mongoose.model('orders', orderSchema)