const Orders = require('../models/orders');
const addOrder = async (req,res)=>{
    if(req.session.user === undefined) res.redirect('/user/login?message="Must be logged in to view this page"')
    else{
        let order = new Orders({
        product: req.body.itemclicked,
        customer: req.session.user._id,
        customerName: req.session.user.name,
        productName: req.body.searchInput,
        form: req.body.form,
        shade: req.body.shade
    });
    try{
        await order.save();
        console.log(order);
        res.redirect('/user/myprofile'); 
    }
    catch(err){
        console.log(err);
        res.redirect("/user/store?message='Could not register order'");
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
    if(temp.status.name == 'Processing'){
        temp.status.name = 'Shipping'
        temp.status.img = 'shipping.png'
    }
    else if(temp.status.name == 'Shipping'){
        temp.status.name = 'Delivering'
        temp.status.img = 'distribution.png'
    }
    else if(temp.status.name == 'Delivering'){
            temp.delivered = true
            temp.status.name = 'Received'
            temp.status.img = 'delivered.png'
    }
    temp.save()
    res.redirect('/user/myprofile')
   }
    else res.redirect('/user/myprofile?message="Order was not found"');
}
}

module.exports = {addOrder, getOrders, displayOrders, progress}
