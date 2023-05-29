const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Products = require('../models/products');
const findUser = require('../controllers/findUser');
const Accounts= require ('../models/accounts');
router.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://flavouredmiu:webproject123@cluster0.t6ylmgo.mongodb.net/Flavoured').then(result =>{console.log("connected")}).catch(err => {console.log(err)})
router.get('/', (req,res)=>{
    let q=Products.find()
    q.sort({numPurchases: -1})
    q.limit(3).then(prods =>{
        res.render('index', { user: (req.session.user === undefined ? "" : req.session.user) , prods: prods })
    })
})
router.get('/support', (req,res)=>{
    res.render('help' ,{ user: (req.session.user === undefined ? "" : req.session.user) })
})
router.get('/store', (req,res)=>{
    res.redirect('/store/1')
});
router.get('/store/:page',  (req, res) => {
    let pageNumber = parseInt(req.params.page);
    let prods
    Products.find().then(result =>{
    if(pageNumber>result.length/9) pageNumber = result.length/9;
    if(pageNumber<1) pageNumber = 1;
    prods=result.slice((pageNumber-1)*9, ((pageNumber-1)*9)+9);
    res.render('store', { user: (req.session.user === undefined ? "" : req.session.user) , 
    prods: prods,
    current_page: pageNumber,
    total_page: Math.ceil(result.length/9)})
    }).catch(err => {console.log(err)}).then()
  });
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
  });
  router.post('/logging', findUser.findUser)
   
module.exports = router
