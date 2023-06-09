const bcrypt = require('bcrypt')
const Accounts = require('../models/accounts');

const addUser= async(req,res) =>{
    let found =  await Accounts.findOne({email : req.body.email} )
  if(found) res.redirect('/user/login?message="Email is already registered"')
  else{
    let role = req.body.role
    let user = new Accounts({
    name: req.body.name,
    password: await bcrypt.hash(req.body.psw,12),
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    country: req.body.country,
    birthDate: req.body.bdate,
    role: req.body.role
    });
try{
    await user.save();
    req.session.user = user;
    let temp = req.body.psw
    req.session.user.password = ''
    for(let i =0; i<temp.length; i++) req.session.user.password += 'x'
    if(role == 'customer') res.redirect('/store'); 
    else res.redirect('/admin/users');
}
catch(err){
    console.log(err);
    if(role == 'customer') res.redirect("/signup?message='Could not add user'");
    else res.redirect("/admin/users?message='Could not add user'");
}}}

const findUser = async (req,res)=>{
    let temp = req.body.psw
    let user = {
    email: req.body.email,
    
    }
    Accounts.findOne(user).then(async result => {
        if((result )&& (await bcrypt.compare(temp , result.password))){
            req.session.user = result;
            req.session.user.password = ''
            for(let i =0; i<temp.length; i++) req.session.user.password += 'x'            
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

    const adminModifier = async (req,res)=>{
        if(req.session.user != undefined && req.session.user.role=='admin'){
        const user = {
        name: req.query.name,
        email: req.query.email,
        phone: req.query.phone,
        password: await bcrypt.hash(req.query.psw, 12),
        }  
        if(req.query.name == '') delete user.name;
        if(req.query.email == '') delete user.email;
        if(req.query.phone == '') delete user.phone;
        if(req.query.psw == '') delete user.password;
        if(user.email != 'flavouredmiu@gmail.com'){
        Accounts.findOneAndUpdate({_id: req.query.id}, user).then(result => {
            if(result) res.redirect('/admin/users');
            else res.redirect('/admin/users?message="Could not modify user. Email does not exist"');
        }).catch(err => {
            console.log(err);
            res.redirect('/admin/users?message="Could not modify user"');
        })
    }
    else res.redirect('/admin/users?message="Can not modify their royal highness"');
    }
    else res.redirect('/admin/not');
    }


    const modifyUser = async (req,res)=>{
            if(req.session.user != undefined){
                if(req.body.newName == '') req.body.newName = req.session.user.name;
                if(req.body.newEmail == '') req.body.newEmail = req.session.user.email;
                if(req.body.newPhone == '') req.body.newPhone = req.session.user.phone;
                if(req.body.newPassword == '') req.body.newPassword = "nopass"
                if(req.body.newCountry == '') req.body.newCountry = req.session.user.country;
                if(req.body.newAddress == '') req.body.newAddress = req.session.user.address;
                if(req.body.newBirthdate == '') req.body.newBirthdate = req.session.user.birthDate;
            const user = {
            name: req.body.newName,
            email: req.body.newEmail,
            phone: req.body.newPhone,
            password: await bcrypt.hash(req.body.newPassword,12),
            country: req.body.newCountry,
            address: req.body.newAddress,
            birthDate: req.body.newBirthdate
            }
            if(req.body.newPassword == "nopass") delete user.password
            Accounts.findOneAndUpdate({_id: req.body.ogid}, user).then(result => {
                if(result) { 
                    req.session.user.name = req.body.newName;
                    req.session.user.email = req.body.newEmail;
                    req.session.user.phone = req.body.newPhone;
                    let temp = req.body.newPassword
                    req.session.user.password = ''
                    for(let i =0; i<temp.length; i++) req.session.user.password += 'x'
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
        else res.redirect('/user/not');
    }
    
const remove = async (req,res)=>{
  if(req.session.user != undefined && req.session.user.role=='admin'){

  if(req.query.id != "6474e8281ffd93c85c988672"){
    const account = await Accounts.findOneAndRemove({ _id: req.query.id });

   if (account) {
     console.log(account);
     res.redirect('/admin/users');
   } else {
     console.log('No account found');
     res.redirect("/admin/users?message='Could not remove account'"); 
    }
  }
  else res.redirect("/admin/users?message = 'Can not remove their royal highness'");
}
else res.redirect('/admin/not');
}

const update = async (req,res)=>{
    const card = {
        cvv: req.body.cvv,
        cardNumber: req.body.number,
        expMonth: req.body.month,
        expYear: req.body.year
    }
    const ups = {
        paymentMethod: "Card",
        card: card
    }
    Accounts.findOneAndUpdate({_id:req.session.user._id},ups).then(result => {
        if(result){
            req.session.user = result;
            req.session.user.paymentMethod = "Card";
            req.session.user.card = card;
            res.redirect("/user/myprofile");
        }
        else{
        res.redirect( "/user/myprofile/?message='Failed to add payment method'",)
        }
    })
    .catch(err => {
        console.log(err);
        res.render('notfound',{layout:false});
    }
    )}

    const passwordReset = async (req,res)=>{
        Accounts.findOneAndUpdate({email : req.body.email}, {password: await bcrypt.hash(req.body.psw,12)})
        .then(result =>{
            console.log(result)
            res.redirect('/user/login');
        })
        .catch(err=>{
            console.log(err)
            res.redirect('user/confirmation?message="Failed to update password"')
        })
    }

    const searchUsers = async (req, res) => {
        let payload = req.body.payload;
        let search = await Accounts.find({name: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
        search= search.slice (0, 10);
        res.send({payload: search});
    }

module.exports = {addUser, findUser, adminModifier, modifyUser, remove, update, passwordReset, searchUsers}