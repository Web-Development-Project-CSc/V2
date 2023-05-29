const Products = require('../models/products');
const addProduct = async (req,res)=>{
const product = new Products({
    name: req.body.name,
    price: req.body.price,
    imgUrl: "/IMAGES/Flavours/"+ req.file.filename,
});
try{
    await product.save();
    res.redirect('/admin/products'); 
}
catch(err){
    console.log(err);
    res.redirect("admin/login?message='Could not add product'");

}
}
module.exports = {addProduct}