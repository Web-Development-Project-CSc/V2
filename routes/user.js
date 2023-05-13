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
router.get('/forgetpassword',(req,res)=>{
    res.render('forgetPassword',  { layout: false});
})
router.get('/confirm',(req,res)=>{
    res.render('confirmationPage',  { layout: false});
})

router.get('/privacypolicy', (req,res)=>{
    res.render('privacyPolicy',{ layout:false})
});

module.exports = router