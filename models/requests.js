const mongoose = require('mongoose')
const requestsSchema = new mongoose.Schema(
    {
            flavourName : String,
            number : {
                type: Number,
                default: 1
            },
    }
  )
module.exports = mongoose.model('requests', requestsSchema)


