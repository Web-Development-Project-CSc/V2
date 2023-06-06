const express = require('express')
const router = express.Router();
const ctrlAccounts = require('../controllers/ctrlAccounts');
const ctrlProducts = require('../controllers/ctrlProducts');
const ctrlFAQsandRequests = require('../controllers/ctrlFAQ&Requests')
const google = require('../controllers/google')
const Page = require('../controllers/pages')

router.use(express.urlencoded({extended:true}))


router.get('/', Page.ROOT.home)
router.get('/support', Page.ROOT.support)
router.get('/privacypolicy', Page.ROOT.termsOfPrivacy)
router.get('/store/:page', Page.ROOT.store);

router.get('/store', (req,res)=>{
    res.redirect('/store/1')
});

router.get('/login', (req,res)=>{
    res.redirect('/user/login')
})
router.get('/signup', (req,res)=>{
    res.redirect('/user/signup')
})

router.get('/logout', Page.PUBLIC.logout);

router.get('/googletry', google.geturl)
router.get('/google', google.handler)

router.post('/logging', ctrlAccounts.findUser)
router.post('/getResults', ctrlProducts.searchProducts);
router.post('/FAQ', ctrlFAQsandRequests.addFAQ)
router.post('/Request', ctrlFAQsandRequests.addRequest)   



module.exports = router
