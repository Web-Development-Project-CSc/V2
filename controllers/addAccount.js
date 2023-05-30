const Accounts = require('../models/accounts');
const addUser= async(req,res) =>{
  
    let role = req.body.role
let user = new Accounts({
    name: req.body.name,
    password: req.body.psw,
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
    req.session.user = user;
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