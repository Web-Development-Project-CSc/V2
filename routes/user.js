const express = require('express')
const router = express.Router();
router.use(express.urlencoded({extended:true}))

const session = require('express-session');
router.use(session({ secret: 'Your_Secret_Key', resave: false,
saveUninitialized: true }))

const Page = require('../controllers/pages')
const ctrlAccounts = require('../controllers/ctrlAccounts');
const ctrlOrders = require('../controllers/ctrlOrders')
const sendEmail = require('../controllers/sendgrid');


router.get('/', (req,res)=>{
    res.redirect('/user/login')
})

router.get('/login', Page.PUBLIC.goToLogin)
router.get('/signup', Page.PUBLIC.goToSignup)
router.get('/not', Page.PUBLIC.notLogged)

router.post('/signing',ctrlAccounts.addUser);
router.post('/getpass', Page.USER.getPassword)
router.post('/getaccounts', Page.USER.getEmail)

router.get('/forgetpassword', Page.USER.forgetPassword)
router.get('/confirmation',Page.USER.resetPassword)
router.get('/confirm',sendEmail.sendEmail)

router.get('/myprofile', Page.USER.myProfile)
router.get('/cart',Page.USER.getCart)

router.post('/createOrder', ctrlOrders.addOrder)
router.post('/addtocart', Page.USER.addToCart)
router.post('/modify', ctrlAccounts.modifyUser)
router.get('/removew', ctrlOrders.removewish)
router.post('/wishing', ctrlOrders.wish)
router.post('/checkout', ctrlOrders.batch)
router.post('/payment',ctrlAccounts.update)

module.exports = router