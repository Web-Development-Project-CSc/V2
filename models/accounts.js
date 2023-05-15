const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
    name:String,
    password:String,
    country:String,
    phone:Number,
    address:String,
    birthDate:Date,
    email:String,
    paymentMethod:String,
    card:
    {
        cvv:String,
        cardNumber:Number,
        expDate:Date,
    },
    numPurchases:Number,
    boughtProducts:[
    {
        type: mongoose.SchemaTypes.objectid,
        ref:"Products"
    }],
    buy: function(p){
        this.boughtProducts.$push(p);
    }
})
module.exports = mongoose.Model('Account',accountSchema)