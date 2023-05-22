const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/IMAGES/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

mongoose.connect('mongodb+srv://flavouredmiu:webproject123@cluster0.t6ylmgo.mongodb.net/Flavoured').then(result =>{console.log("connected")}).catch(err => {console.log(err)})

router.get('/', (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    res.render('dashboard', { layout: false, user: req.session.user });
  } else {
    res.redirect('admin/login');
  }
});

router.get('/products', (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    res.render('products', { layout: false, user: req.session.user });
  } else {
    res.redirect('login');
  }
});

router.get('/users', (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    res.render('users', { layout: false, user: req.session.user });
  } else {
    res.redirect('login');
  }
});

router.get('/login', (req, res) => {
  res.render('login', { layout: false}, {user: req.session.user || '' });
});

router.post('/products', upload.single('image'), (req, res) => {
  if (req.session.user !== undefined && req.session.user.role === 'admin') {
    res.render('products', { layout: false, user: req.session.user });
  } else {
    res.redirect('login');
  }
});

module.exports = router;
