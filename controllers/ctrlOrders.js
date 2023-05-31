const Orders = require('../models/orders');
const addOrder = async (req,res)=>{
    if(req.session.user === undefined) res.redirect('/user/login?message="Must be logged in to view this page"')
    else{
        let order = new Orders({
        product: req.body.prodid,
        customer: req.session.user._id,
        form: req.body.form,
        shade: req.body.shade
    });
    try{
        await order.save();
        console.log(order);
        res.redirect('/user/cart'); 
    }
    catch(err){
        console.log(err);
        res.redirect("/user/store?message='Could not add product to cart'");
    }
}
}
const getOrders = async (req,res)=>{
    if(req.session.user === undefined) res.redirect('/user/login?message="Must be logged in to view this page"')
    else{
Orders.find({customer: req.session.user._id}).populate('product').then(orders =>{
    if(orders) res.redirect('/user/cart');
    else res.redirect('/user/cart?message="No orders found"');
}).catch(err => {console.log(err)
    res.redirect('/user/cart?message="No orders found"');});
}
}
const displayOrders = async (req,res)=>{
    if(req.session.user === undefined) res.redirect('/user/login?message="Must be logged in to view this page"')
    else{
    Orders.find({customer: req.session.user._id}).populate('product').then(orders =>{
        if(orders) res.redirect('/user/myprofile');
        else res.redirect('/user/myprofile?message="No orders found"');
    }).catch(err => {console.log(err)
        res.redirect('/user/myprofile?message="No orders found"');});
    }
}
const progress = async (req,res)=>{
    if(req.session.user === undefined) res.redirect('/user/login?message="Must be logged in to view this page"')
    else{
   let temp = await Orders.findOne({customer: req.session.user._id, _id : req.query.orderid})
   if(temp){
    if(temp.status.name == 'Placed'){
        temp.status.name = 'Shipped'
        temp.status.imgNum = 1
    }
    else if(temp.status.name == 'Shipped'){
        temp.status.name = 'Delivered'
        temp.status.imgNum = 2
    }
    else if(temp.status.name == 'Delivered'){
            temp.delivered = true
    }
    temp.save()
    res.redirect('/user/myprofile')
   }
    else res.redirect('/user/myprofile?message="Order was not found"');
}
}

module.exports = {addOrder, getOrders, displayOrders, progress}