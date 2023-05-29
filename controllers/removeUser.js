const Accounts = require('../models/accounts');
const remove = async (req,res)=>{
    const account = await Accounts.findOneAndRemove({ _id: req.query.id });

   if (account) {
     console.log(account);
     res.redirect('/admin/users');
   } else {
     console.log('No account found');
     res.redirect('/admin/users');
   }
}
module.exports = {remove}