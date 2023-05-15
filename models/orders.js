const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    status:{
        name:String,
        imgNum:Number
    },
    delivered:Boolean,
    product:
        {
            type: mongoose.SchemaTypes.objectid,
            ref:"Products"
        },
        customer:
            {
                type: mongoose.SchemaTypes.objectid,
                ref:"Accounts"
            },
            type:String,
            shade:String,
            quantity:Number
})
module.exports = mongoose.Model('Order', orderSchema)