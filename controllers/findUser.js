const Accounts = require('../models/accounts');
const findUser = async (req,res)=>{
    let user = {
        email: req.body.email,
        password: req.body.psw
    }
    Accounts.findOne( user ).then(result => {
        if(result){
            req.session.user = result;
            req.session.order = [];
            console.log("logged in");
            if(req.session.user !== undefined && req.session.user.role==='admin') 
            res.redirect( "/admin");
            else if(req.session.user !== undefined && req.session.user.role==='customer')
            res.redirect("/user/myprofile");
        }
        else{
        console.log("not logged in");
        res.redirect( "/user/login/?message='Failed to login'",)
        }
    }).catch(err => {
        console.log(err);
        res.render('notfound',{layout:false});
    })}

    module.exports = {findUser}