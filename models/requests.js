const mongoose = require('mongoose')
const requestsSchema = new mongoose.Schema(
    {
            flavourName : String,
            number : {
                type: Number,
                default: 1
            },
          }, {timestamps:true})
module.exports = mongoose.model('requests', requestsSchema)


