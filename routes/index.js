const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Accounts = require('../models/accounts');
router.use(express.urlencoded({extended:true}))
mongoose.connect('mongodb+srv://flavouredmiu:webproject123@cluster0.t6ylmgo.mongodb.net/?retryWrites=true&w=majority').then(resault =>{console.log("connected")}).catch(err => {console.log(err)})
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
 console.log(Accounts.find({}))
Accounts.find(user).then(result => {
    console.log(result)
if(result.length >0){
    req.session.user = result[0];
    console.log(req.session.user);
    console.log("logged in");
    if(req.session.user !== undefined && req.session.user.role==='admin') 
    res.redirect('/admin');
    else if(req.session.user !== undefined && req.session.user.role==='user')
    res.redirect('/user/myprofile');
}
else {
    console.log("not logged in");
    res.redirect('/');
}}).catch(err => {
    console.log(err);
    res.render('notfound',{layout:false});
})})
   
module.exports = router
