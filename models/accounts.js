const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
    name:String,
    password:String,
    country:String,
    phone:Number,
    address:String,
    birthDate:Date,
    email:String,
    paymentMethod:{
        type:String,
        default:"Cash"
    },
    card:
    {
    type:{
        cvv:String,
        cardNumber:Number,
        expDate:Date,
    }, default:null
    },
    numPurchases:{
        type:Number,
        default:0
    },
    boughtProducts:[
    {
        type: mongoose.SchemaTypes.objectid,
        ref:"Products",
        default:null
    }]
   ,role:{
    type: String, 
    default:"customer"} 
    ,
    buy: function(p){
        this.boughtProducts.$push(p);
    }
})
module.exports = mongoose.Model('Account',accountSchema)