const mongoose = require('mongoose')
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
            feedback: Boolean,  
        },
  )
module.exports = mongoose.model('feedback', feedbackSchema)

        


    

