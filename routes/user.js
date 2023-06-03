require("dotenv").config();
const express = require('express')
const router = express.Router();
const sendEmail = require('../controllers/sendgrid');
const ctrlAccounts = require('../controllers/ctrlAccounts');
const session = require('express-session');
const Accounts = require('../models/accounts')
const Orders = require('../models/orders')
const ctrlOrders = require('../controllers/ctrlOrders')
const bcrypt = require('bcrypt')
router.use(session({ secret: 'Your_Secret_Key', resave: false,
saveUninitialized: true }))
router.use(express.urlencoded({extended:true}))
router.get('/', (req,res)=>{
    res.redirect('/user/login')
})
router.get('/login', (req,res)=>{
    res.render('login',  { message: '', layout: false})
})
router.get('/signup',(req,res)=>{
    res.render('signup',  { message: '', layout: false});
})

router.post('/getpass' ,(req,res)=>{
    let email = req.body.mail
    let password = req.body.pass
    Accounts.findOne({ email: email}).then(async result=>{
        if(result){
            res.send({result: 'found' , pass: await bcrypt.compare(password,result.password)})
        }
        else{
            res.send({result: 'not found',pass: ''})
        }
    })
   
})
router.post('/getaccounts' ,(req,res)=>{
    let email = req.body.mail
    Accounts.findOne({ email: email}).then(async result=>{
        if(result){
            res.send({result: 'found'})
        }
        else{
            res.send({result: 'not found'})
        }
    })
   
})
router.post('/signing',ctrlAccounts.addUser);

router.post('/createOrder' , ctrlOrders.addOrder)

router.get('/cart',(req,res)=>{

    if (req.session.user !== undefined) 
    res.render('cart',  { message: '', layout: false, orders: (req.session.order === undefined ? "" : req.session.order)});
    else res.redirect("/user/login?message= 'Must be logged in to view this page'");
})

router.get('/myprofile',(req,res)=>{
    if (req.session.user !== undefined){ 
    Orders.find({customer : req.session.user._id}).then(result=>{
    res.render('myProfile', {message: '', user: req.session.user ,layout: false, orders: (result === null ? "" : result)});
    }).catch(err=>{
        console.log(err)
        res.redirect("/user/myprofile?message= 'Could not load orders'")
    }
    )}
    else res.redirect("/user/login?message= 'Must be logged in to view this page'");
})

router.get('/forgetpassword',(req,res)=>{
    if (req.session.user !== undefined) {
        req.session.forgot = true;
    res.render('forgetPassword',  {message: '', layout: false});
    }
    else res.redirect("/user/login?message= 'Must be logged in to view this page'");
})
router.get('/confirmation',(req,res)=>{
    if (req.session.user !== undefined ) {
        if(req.session.forgot == true){
            req.session.forgot = false;
            res.render('confirmationPage',  {message: '', layout: false});
        }
        else res.redirect("/user/forgetpassword?message= 'Enter your email to reset password'");
    }
    else res.redirect("/user/login?message= 'Must be logged in to view this page'");
    });
router.get('/confirm',sendEmail.sendEmail)
router.post('/modify', ctrlAccounts.modifyUser)
router.get('/privacypolicy', (req,res)=>{
    res.render('privacyPolicy',{ layout:false})
})
router.post('/checkout', ctrlOrders.batch)
router.post('/payment',ctrlAccounts.update)

module.exports = router