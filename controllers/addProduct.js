const Products = require('../models/products');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://flavouredmiu:webproject123@cluster0.t6ylmgo.mongodb.net/Flavoured').then(result =>{console.log("connected")}).catch(err => {console.log(err)})
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
    res.redirect('/admin/products');
}
}
module.exports = {addProduct}