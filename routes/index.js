const express = require('express')
const app = express()
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index')
})
router.get('/support', (req,res)=>{
    res.render('help')
})
router.get('/store', (req,res)=>{
    res.render('store')
});
module.exports = router
app.use(function(req,res,next){ 
});