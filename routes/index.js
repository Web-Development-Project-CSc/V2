const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Accounts = require('../models/Accounts');
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
  router.post('/logging', (req,res)=>{
    let user = {
        email: req.body.email,
        password: req.body.psw
    }
    console.log(user);
Accounts.findOne( user ).then(result => {
if(result){
    req.session.user = result;
    console.log(req.session.user);
    console.log("logged in");
    if(req.session.user !== undefined && req.session.user.role==='admin') 
    res.redirect('/admin');
    else if(req.session.user !== undefined && req.session.user.role==='customer')
    res.redirect('/user/myprofile');
}
else {
    console.log(result)
    console.log("not logged in");
    res.redirect('/');
}}).catch(err => {
    console.log(err);
    res.render('notfound',{layout:false});
})})
   
module.exports = router
