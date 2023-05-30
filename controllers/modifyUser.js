const Accounts = require('../models/accounts');
const adminModifier = async (req,res)=>{
    if(req.session.user != undefined && req.session.user.role=='admin'){
    const user = {
    name: req.query.name,
    email: req.query.email,
    phone: req.query.phone,
    password:  req.query.psw,
    }  
    if(req.query.name == '') delete user.name;
    if(req.query.email == '') delete user.email;
    if(req.query.phone == '') delete user.phone;
    if(req.query.psw == '') delete user.password;

    Accounts.findOneAndUpdate({_id: req.query.id}, user).then(result => {
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
            if(req.body.newName == '') req.body.newName = req.session.user.name;
            if(req.body.newEmail == '') req.body.newEmail = req.session.user.email;
            if(req.body.newPhone == '') req.body.newPhone = req.session.user.phone;
            if(req.body.newPassword == '') req.body.newPassword = req.session.user.password;
            if(req.body.newCountry == '') req.body.newCountry = req.session.user.country;
            if(req.body.newAddress == '') req.body.newAddress = req.session.user.address;
            if(req.body.newBirthdate == '') req.body.newBirthdate = req.session.user.birthDate;
        const user = {
        name: req.body.newName,
        email: req.body.newEmail,
        phone: req.body.newPhone,
        password: req.body.newPassword,
        country: req.body.newCountry,
        address: req.body.newAddress,
        birthDate: req.body.newBirthdate
        }
        Accounts.findOneAndUpdate({_id: req.body.ogid}, user).then(result => {
            if(result) { 
                req.session.user.name = req.body.newName;
                req.session.user.email = req.body.newEmail;
                req.session.user.phone = req.body.newPhone;
                req.session.user.password = req.body.newPassword;
                req.session.user.country = req.body.newCountry;
                req.session.user.address = req.body.newAddress;
                req.session.user.birthDate = req.body.newBirthdate;
                res.redirect('/user/myprofile')
            }
            else res.redirect('/user/myprofile?message="Could not modify user."');
        }).catch(err => {
            console.log(err);
            res.redirect('/user/myprofile?message="Could not modify user."');
        })
    }
    else res.redirect("/user/login?message= 'Must be logged in to modify account'");
}

module.exports = {modifyUser, adminModifier};