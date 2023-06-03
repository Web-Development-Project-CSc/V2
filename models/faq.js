const mongoose = require('mongoose')
const faqSchema = new mongoose.Schema(
    {
            customer:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"accounts"

            },
            question : String,
        },
  )
module.exports = mongoose.model('faq', faqSchema)

        


    

