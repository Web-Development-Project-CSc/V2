const FAQs = require('../models/faq');
const Accounts = require('../models/accounts');
const addFAQ = async (req,res)=>{
    let customer;
    Accounts.findOne({email: req.body.email}).then(async result=>{
    customer = result
    })
    const faq = new FAQs({
        customer: customer._id,
        question: req.body.question
    });
    try{
        await faq.save();
        res.redirect('/user/myprofile');
    }
    catch(err){
        console.log(err);
        res.redirect("/support?message='Could not register FAQ'");
    }
}
module.exports = {addFAQ}