const express = require('express');
const router = express.Router();
const multer = require('multer');
const ctrlAccounts = require('../controllers/ctrlAccounts');
const ctrlProducts = require('../controllers/ctrlProducts');
const Products = require('../models/products')
const Accounts = require('../models/accounts')
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
      res.render('dashboard', { message: '', layout: false, user: req.session.user , prods: prods})});
    } else {
    res.redirect("/admin/login?message='Must be logged in as admin to view this page'");
  }
});
router.post('/getResults',ctrlProducts.searchProducts);
router.post('/getUserResults', ctrlAccounts.searchUsers);
router.get('/products', (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    Products.find().then(prods =>{
    res.render('products', { message: '', layout: false, user: req.session.user , prods: prods})});
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
router.get("/removeu",ctrlAccounts.remove)
router.post("/addinguser",ctrlAccounts.addUser)
router.post('/addproducts', upload.single('image'),  ctrlProducts.addProduct)
router.get('/modify',ctrlAccounts.adminModifier)
router.get('/modifyproduct',ctrlProducts.modify)
module.exports = router;
