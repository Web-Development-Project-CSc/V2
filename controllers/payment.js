const Accounts = require('../models/accounts');
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
        res.redirect( "/user/login/?message='Failed to add payment method'",)
        }
    })
    .catch(err => {
        console.log(err);
        res.render('notfound',{layout:false});
    }
    )}
module.exports = {update}