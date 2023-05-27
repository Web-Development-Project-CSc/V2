require("dotenv").config();
const express = require('express')
const router = express.Router();
const sendEmail = require('../controllers/sendgrid');
const addUser = require('../controllers/addAccount');
const session = require('express-session');
router.use(session({ secret: 'Your_Secret_Key', resave: false,
saveUninitialized: true }))

router.get('/login', (req,res)=>{
    res.render('login',  { layout: false})
})
router.get('/signup',(req,res)=>{
    res.render('signup',  { layout: false});
})
router.post('/signing',addUser.addUser);
router.get('/cart',(req,res)=>{
    res.render('cart',  { layout: false});
})
router.get('/myprofile',(req,res)=>{
    if(req.session.user){ res.render('myProfile', {username: req.session.user.name , password: req.session.user.password, country: req.session.user.country ,phone: req.session.user.phone,address: req.session.user.address,email:req.session.user.email, payment:req.session.user.paymentMethod , bDay: req.session.user.birthDate ,layout: false});
  }else
  { res.redirect('/user/login');}
})
router.get('/forgetpassword',(req,res)=>{

    res.render('forgetPassword',  { layout: false});
})
router.get('/confirmation',(req,res)=>{
    res.render('confirmationPage',  { layout: false});
    });
router.get('/confirm',sendEmail.sendEmail)
router.get('/privacypolicy', (req,res)=>{
    res.render('privacyPolicy',{ layout:false})
});

module.exports = router