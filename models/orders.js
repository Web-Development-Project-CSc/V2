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
            quantity:Number,
            date:Date,
            progress: function(stat){
                this.status.name = stat;
                if(stat === null){
                    this.status.name = "Placed";
                    this.status.imgNum = 0; 
                }
                else if(stat === "Shipped"){
                    this.status.imgNum = 1
                }
                else if(stat === "Delivered"){
                this.status.imgNum = 2;
                }
                else this.delivered = true;
            }
})
module.exports = mongoose.Model('Order', orderSchema)