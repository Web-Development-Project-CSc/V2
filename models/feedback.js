const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')
const feedbackSchema = new mongoose.Schema(
    {
            product:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"products"
            },
            customer:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"accounts"

            },
            form : String,
            feedback:
            {
              type : Boolean,
               positive : true
            }
            
        },

  )
module.exports = mongoose.model('feedback', feedbackSchema)

        


    

