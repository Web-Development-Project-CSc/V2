const Accounts = require('../models/accounts');
const hash = require('./hash');
const addUser= async(req,res) =>{
    let {hash, salt} = hashPassword(req.body.psw);
    console.log(verifyPassword(req.body.psw, hash, salt));
    let role = req.body.role
let user = new Accounts({
    name: req.body.name,
    password: hash,
    passwordLength: req.body.psw.length,
    encrypt: salt,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country,
    birthDate: req.body.bdate,
    role: req.body.role
}
);
try{
    await user.save();
    if(role == 'customer') res.redirect('/store'); 
    else res.redirect('/admin/users');
}
catch(err){
    console.log(err);
    if(role == 'customer') res.redirect("signup?message='Could not add user'");
    else res.redirect("admin/login?message='Could not add user'");
}
}
module.exports = {addUser}