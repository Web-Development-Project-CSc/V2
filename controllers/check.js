
const Accounts= require ('../models/accounts');
const check = (req, res) => {

    let user = {
        email: req.body.email,
        password: req.body.psw
    }
    let message;
    Accounts.findOne({email: req.body.email})
    .then(result => {
        if(result){
        Accounts.findOne(user)
        .then(result => {
            if(result) message = "Login successful";
            else message = "Password is incorrect";
        })
        .catch(err => {
            console.log(err);
        })
    }
    else message = "Email does not exist";
})
    .catch(err => {
        console.log(err);
    })
    res.send(message);
};
module.exports = {check};