const express = require('express');
const router = express.Router();
const multer = require('multer');
const ctrlAccounts = require('../controllers/ctrlAccounts');
const ctrlProducts = require('../controllers/ctrlProducts');
const ctrlOrders = require('../controllers/ctrlOrders');
const Products = require('../models/products')
const Accounts = require('../models/accounts')
const Orders = require("../models/orders")
const FAQs = require('../models/faq');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/IMAGES/Flavours');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
router.get('/', (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    Products.find().sort({numPurchases: -1}).limit(5).then( prods =>{
      Orders.find().sort({date: -1}).limit(5).then( ords =>{ 
        FAQs.find().sort({date: -1}).limit(5).then( faq =>{
        res.render('dashboard', { message: '', layout: false, 
        user: req.session.user , 
        prods: (prods === null ? "" : prods) , 
        orders: (ords === null ? "" : ords) , 
        faqs: (faq === null ? "" : faq)})})
      })
    })}
    else {
    res.redirect("/admin/login?message='Must be logged in as admin to view this page'");
  }
});

router.get('/orders' , async (req,res) => {
if(req.session.user != undefined && req.session.user.role == "admin")
 {
let order = await Orders.find()
if(order)
res.render("orders" , { layout : false , orders : (order === null ? "" : order)});
else{
 res.redirect("/admin?message='Could not load orders'")
}
}
else{
   res.redirect("/admin/login?message='Must be logged in as admin to view this page'")
}});
router.post('/getResults',ctrlProducts.searchProducts);
router.post('/getUserResults', ctrlAccounts.searchUsers);
router.post('/getOrderResults', ctrlOrders.searchOrders);

router.get('/products', (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    Products.find().then(prods =>{
    res.render('products', { message: '', layout: false, user: req.session.user , prods: (prods === null ? "" : prods)})});
  } else {
    res.redirect("/admin/login?message='Must be logged in as admin to view this page'");
  }
});

router.get('/users', (req, res) => {  
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    Accounts.find().then(accounts =>
    res.render('users',{ layout: false, user: req.session.user , accounts: accounts}))
  } else {
    res.redirect("/admin/login?message='Must be logged in as admin to view this page'");
  }
});

router.get('/login', (req, res) => {
  res.render('login', { layout: false});
});
router.get('/removeo',ctrlOrders.remove)
router.get("/removep",ctrlProducts.remove)
router.get("/removeu",ctrlAccounts.remove)
router.post("/addinguser",ctrlAccounts.addUser)
router.post('/addproducts', upload.single('image'),  ctrlProducts.addProduct)
router.post('/progress', ctrlOrders.progress)
router.get('/modify',ctrlAccounts.adminModifier)
router.get('/modifyproduct',ctrlProducts.modify)
module.exports = router;
