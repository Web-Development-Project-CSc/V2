const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Products = require('../models/products')
const Accounts = require('../models/accounts')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/IMAGES/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });
router.get('/', (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    Products.find().sort({numPurchases: -1}).limit(5).then( prods =>{
      res.render('dashboard', { layout: false, user: req.session.user , prods: prods})});
    } else {
    res.redirect('admin/login');
  }
});

router.get('/products', (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    Products.find().then(prods =>{
    res.render('products', { layout: false, user: req.session.user , prods: prods})});
  } else {
    res.redirect('login');
  }
});

router.get('/users', (req, res) => {  
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    Accounts.find().then(accounts =>
    res.render('users', { layout: false, user: req.session.user , accounts: accounts}))
  } else {
    res.redirect('login');
  }
});

router.get('/login', (req, res) => {
  res.render('login', { layout: false});
});

router.post('/products', upload.single('image'), (req, res) => {

  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    res.render('products', { layout: false, user: req.session.user });
  } else {
    res.redirect('login');
  }
});

module.exports = router;
