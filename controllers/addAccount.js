const Accounts = require('../models/accounts');
const bcrypt = require("bcrypt");
function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return {hash,  salt,};
  }
  function verifyPassword(password, hash, salt) {
    return bcrypt.compareSync(password, hash, salt);
  }
const addUser= async(req,res) =>{
    let {hash, salt} = hashPassword(req.body.psw);
    console.log(verifyPassword(req.body.psw, hash, salt));
    let role = req.body.role
let user = new Accounts({
    name: req.body.name,
    password: hash,
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