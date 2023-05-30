const Products = require('../models/products');
const remove = async (req,res)=>{
  if(req.session.user != undefined && req.session.user.role=='admin'){
    const product = await Products.findOneAndRemove({ name: req.query.name });
   if (product) {
     console.log(product);
     res.redirect('/admin/products');
   } else {
     console.log('No product found');
     res.redirect("/admin/login?message='Could not find product'");
    }
}
else res.redirect("/admin/login?message= 'Must be logged in as admin to remove product'");
}
module.exports = {remove}