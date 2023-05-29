const Accounts = require('../models/accounts');
const remove = async (req,res)=>{
  if(req.query.id != "6474e8281ffd93c85c988672"){
    const account = await Accounts.findOneAndRemove({ _id: req.query.id });

   if (account) {
     console.log(account);
     res.redirect('/admin/users');
   } else {
     console.log('No account found');
     res.redirect("admin/login?message='Could not find account'");
    }
  }
  res.redirect("admin/login?message = 'Can not remove their royal highness'");
}
module.exports = {remove}