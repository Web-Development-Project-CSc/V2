const express = require('express')
const router = express.Router()

router.get('/login', (req,res)=>{
    res.render('login',  { layout: false})
})
router.get('/signup',(req,res)=>{
    res.render('signup',  { layout: false});
})
router.get('/cart',(req,res)=>{
    res.render('cart',  { layout: false});
})
router.get('/myprofile',(req,res)=>{
    res.render('myProfile',  { layout: false});
})
router.get('/forgetpass',(req,res)=>{
    res.render('',  { layout: false});
})
module.exports = router