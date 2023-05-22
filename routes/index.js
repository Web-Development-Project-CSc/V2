const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Accounts = require('../models/accounts');
const findUser = require('../controllers/findUser');
router.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://flavouredmiu:webproject123@cluster0.t6ylmgo.mongodb.net/Flavoured').then(result =>{console.log("connected")}).catch(err => {console.log(err)})
router.get('/', (req,res)=>{
    res.render('index', { user: (req.session.user === undefined ? "" : req.session.user) })
})
router.get('/support', (req,res)=>{
    res.render('help' ,{ user: (req.session.user === undefined ? "" : req.session.user) })
})
router.get('/store', (req,res)=>{
    res.render('store', { user: (req.session.user === undefined ? "" : req.session.user) })
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
  router.post('/logging', findUser.findUser)
   
module.exports = router
