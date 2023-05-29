const Accounts = require('../models/accounts');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://flavouredmiu:webproject123@cluster0.t6ylmgo.mongodb.net/Flavoured').then(result =>{console.log("connected")}).catch(err => {console.log(err)})
const findUser = async (req,res)=>{
    let user = {
        email: req.body.email,
        password: req.body.psw
    }
    console.log(user);
    Accounts.findOne( user ).then(result => {
        if(result){
            req.session.user = result;
            console.log(result);
            console.log("logged in");
            if(req.session.user !== undefined && req.session.user.role==='admin') 
            res.redirect( "/admin");
            else if(req.session.user !== undefined && req.session.user.role==='customer')
            res.redirect("/user/myprofile");
        }
        else{
        console.log(result)
        console.log("not logged in");
        res.redirect( "/")
        }
    }).catch(err => {
        console.log(err);
        res.render('notfound',{layout:false});
    })}

    module.exports = {findUser}