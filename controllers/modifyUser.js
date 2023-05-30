const Accounts = require('../models/accounts');
const hash = require('./hash');
const adminModifier = async (req,res)=>{
    if(req.session.user != undefined && req.session.user.role=='admin'){
    let {hash, salt} = hashPassword(req.body.psw);
    const user = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: hash,
    encrypt: salt,
    }  
    Accounts.findOneAndUpdate({email: req.body.modmail}, user).then(result => {
        if(result) res.redirect('/admin/users');
        else res.redirect('/admin/users?message="Could not modify user. Email does not exist"');
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/users?message="Could not modify user"');
    })
}
else res.redirect("/admin/login?message= 'Must be logged in as admin to modify account'");
}
const modifyUser = async (req,res)=>{
        if(req.session.user != undefined){
        let {hash, salt} = hashPassword(req.body.newPassword);
        const user = {
        name: req.body.newName,
        email: req.body.newEmail,
        phone: req.body.newPhone,
        password: hash,
        encrypt: salt,
        country: req.body.newCountry,
        address: req.body.newAddress,
        }
        Accounts.findOneAndUpdate({email: req.body.ogmail}, user).then(result => {}).catch(err => {})
    }
}
