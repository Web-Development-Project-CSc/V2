const Products = require('../models/products');


const addProduct = async (req,res)=>{
const product = new Products({
    name: req.body.name.trim(),
    price: req.body.price,
    imgUrl: "/IMAGES/Flavours/"+ req.file.filename,
});
try{
    await product.save();
    res.redirect('/admin/products'); 
}
catch(err){
    console.log(err);
    res.redirect("/admin?message='Could not add product'");

}
}

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
    else res.redirect("/admin/login?message='Must be logged in as admin to modify product'");
}

const remove = async (req,res)=>{
    if(req.session.user != undefined && req.session.user.role=='admin'){
      const product = await Products.findOneAndRemove({ name: req.query.name });
     if (product) {
       console.log(product);
       res.redirect('/admin/products');
     } else {
       console.log('No product found');
       res.redirect("/admin/products?message='Could not find product'");
      }
  }
  else res.redirect("/admin/login?message= 'Must be logged in as admin to remove product'");
  }

  const searchProducts = async (req,res)=>{
    let payload = req.body.payload;
    let search = await Products.find({name: {$regex: new RegExp('^'+payload+'.*', 'i')}}).exec();
    search= search.slice (0, 3);
    res.send({payload: search});  
}

module.exports = {addProduct, remove, modify, searchProducts}