const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
    name: String,
    encrypt:String,
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
    
    numPurchases:{
        type:Number,
        default:0
    },
   role:{
    type: String, 
    default:"customer"} 
    ,card:
    {
        type: Object({
                cvv:String,
                cardNumber:Number,
                expDate:Date,
            }), 
    default:null
    }, 
    boughtProducts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"products",
            default:null
        }],   
}, {timestamps:true})
module.exports =  mongoose.model('accounts',accountSchema)
