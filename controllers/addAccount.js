const Accounts = require('../models/accounts');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://flavouredmiu:webproject123@cluster0.t6ylmgo.mongodb.net/Flavoured').then(result =>{console.log("connected")}).catch(err => {console.log(err)})
const addUser= async(req,res) =>{
let user = new Accounts({
    name: req.body.username,
    password: req.body.psw,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country,
    birthDate: req.body.bdate,
    role: "customer"
});
try{
    await user.save();
    res.redirect('/store'); 
}
catch(err){
    console.log(err);
    res.redirect('/signup');
}
}
module.exports = {addUser}