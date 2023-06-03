const FAQs = require('../models/faq');
const Accounts = require('../models/accounts');
const Requests = require('../models/requests');
const addFAQ = async (req,res)=>{
    let customer;
    Accounts.findOne({email: req.body.email}).then(async result=>{
    customer = result
    const faq = new FAQs({
        customer: customer._id,
        question: req.body.question
    });
    try{
        await faq.save();
        res.redirect('/support');
    }
    catch(err){
        console.log(err);
        res.redirect("/support?message='Could not register query'");
    }
    })   
}
const addRequest = async (req,res)=>{
    const reqs = await Requests.findOneAndUpdate({flavourName: req.body.flavourName}, {$inc: {number: 1}})
    if(reqs) res.redirect('/support');
    else{
    const request = new Requests({
        flavourName: req.body.flavourName,
    });
    try{
        await request.save();
        res.redirect('/support');
    }
    catch(err){
        console.log(err);
        res.redirect("/support?message='Could not register request'");
    }
}
} 
module.exports = {addFAQ, addRequest}