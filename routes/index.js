const express = require('express')
const router = express.Router();
const Products = require('../models/products');
const ctrlAccounts = require('../controllers/ctrlAccounts');
const ctrlProducts = require('../controllers/ctrlProducts');
const FAQandRequests = require('../controllers/ctrlFAQ&Requests')
router.use(express.urlencoded({extended:true}))
router.get('/', (req,res)=>{
    let q=Products.find()
    q.sort({numPurchases: -1})
    q.limit(3).then(prods =>{
        res.render('index', { message: '', user: (req.session.user === undefined ? "" : req.session.user) , prods: (prods === null ? "" : prods) })
    })
})
router.get('/login', (req,res)=>{
    res.redirect('/user/login')
})
router.get('/support', (req,res)=>{
    res.render('help' ,{ message: '', user: (req.session.user === undefined ? "" : req.session.user) })
})
router.get('/store', (req,res)=>{
    res.redirect('/store/1')
});
router.get('/store/:page',  (req, res) => {
    let pageNumber = parseInt(req.params.page);
    let prods = null
    Products.find().then(result =>{
    if(pageNumber>result.length/9) pageNumber = result.length/9;
    if(pageNumber<1) pageNumber = 1;
    prods=result.slice((pageNumber-1)*9, ((pageNumber-1)*9)+9);
    res.render('store', { message: '', user: (req.session.user === undefined ? "" : req.session.user) , 
    prods: (prods === null ? "" : prods),
    current_page: pageNumber,
    total_page: Math.ceil(result.length/9)})
    }).catch(err => {console.log(err)}).then()});

router.post('/getResults', ctrlProducts.searchProducts);
    
router.get('/logout', (req, res) => {
    if (req.session.user !== undefined) req.session.destroy();
    res.redirect('/');
  });
  router.post('/logging', ctrlAccounts.findUser)
  router.post('/addtocart', (req,res)=>{
 if (req.session.user !== undefined){
            req.session.order = req.body.order;
            res.session = req.session;
            res.redirect('/user/cart');        }
else res.redirect("/user/login?message= 'Must be logged in to view this page'")}
)
router.post('/FAQ', FAQandRequests.addFAQ)
router.post('/Request', FAQandRequests.addRequest)   
module.exports = router
