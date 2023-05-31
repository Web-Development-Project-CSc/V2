const mongoose = require('mongoose')
const accountSchema = new mongoose.Schema({
    name:{type: String , required:true},
    password:{type: String ,required:true},
    country:{type: String ,required:true},
    phone:{type: Number, required:true},
    address:{type: String, required:true},
    birthDate:{type: Date, required:true},
    email:{type: String, required:true},
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
    default:"customer",
    required:true} 
    ,card:
    {
        type: Object({
                cvv:String,
                cardNumber:Number,
                expMonth:String,
                expYear:String
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
