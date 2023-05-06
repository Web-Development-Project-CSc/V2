const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index')
})
router.get('/support', (req,res)=>{
    res.render('help')
})
module.exports = router