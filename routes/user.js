require("dotenv").config();
const express = require('express')
const router = express.Router();
const sendEmail = require('../controllers/sendgrid');
const addUser = require('../controllers/addAccount');
const check = require('../controllers/check');
const session = require('express-session');
router.use(session({ secret: 'Your_Secret_Key', resave: false,
saveUninitialized: true }))

router.get('/login', (req,res)=>{
    res.render('login',  { message: '', layout: false})
})
router.get('/signup',(req,res)=>{
    res.render('signup',  { message: '', layout: false});
})
router.post('/checker',check.check);

router.post('/signing',addUser.addUser);

router.use((req, res, next) => {
  if (req.session.user !== undefined && req.session.user.role === 'customer') {
      next();
  }
  else {
    res.redirect("user/login?message = 'Must be logged in to view this page'");
  }
});

router.get('/cart',(req,res)=>{
    res.render('cart',  { message: '', layout: false});
})
router.get('/myprofile',(req,res)=>{
 res.render('myProfile', {message: '', username: req.session.user.name , password: req.session.user.password, country: req.session.user.country ,phone: req.session.user.phone,address: req.session.user.address,email:req.session.user.email, payment:req.session.user.paymentMethod , bDay: req.session.user.birthDate ,layout: false});
})

router.get('/forgetpassword',(req,res)=>{
    res.render('forgetPassword',  {message: '', layout: false});
})
router.get('/confirmation',(req,res)=>{
    res.render('confirmationPage',  {message: '', layout: false});
    });
router.get('/confirm',sendEmail.sendEmail)

router.get('/privacypolicy', (req,res)=>{
    res.render('privacyPolicy',{ layout:false})
});

module.exports = router