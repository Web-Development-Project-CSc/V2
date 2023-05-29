const Products = require('../models/products');
const remove = async (req,res)=>{
    const product = await Products.findOneAndRemove({ name: req.query.name });

   if (product) {
     console.log(product);
     res.redirect('/admin/products');
   } else {
     console.log('No product found');
     res.redirect('/admin/products');
   }
}
module.exports = {remove}