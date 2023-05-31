const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')
const feedbackSchema = new mongoose.Schema(
    {
        
            product:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
        }  
)

        


    

