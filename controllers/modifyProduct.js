const Products = require('../models/products');
const modify = async (req,res)=>{
    if(req.session.user != undefined && req.session.user.role=='admin'){

    Products.findOneAndUpdate({_id:req.query.id}, {price:req.query.price}).then(result => {
        if(result) res.redirect('/admin/products');
        else res.redirect('/admin/products?message="Could not modify product.');
    }).catch(err => {
        console.log(err);
        res.redirect('/admin/products?message="Could not modify product.');
    })
    }
}
module.exports = {modify}