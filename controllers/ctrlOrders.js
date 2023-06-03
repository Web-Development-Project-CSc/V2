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

const batch = async (req,res)=>{
    if(req.session.user != undefined){
        let orders = req.session.order;
        for(let i=0; i<orders.length; i++){
            let order = new Orders({
                product: orders[i].prodid,
                customer: req.session.user._id,
                customerName: req.session.user.name,
                productName: orders[i].prodname,
                form: orders[i].state,
                shade: orders[i].shade,
                quantity: orders[i].quantity
            });
            try{
                await order.save();
                console.log(order);
            }
            catch(err){
                console.log(err);
                res.redirect("/user/cart?message='Could not register order'");
            }
        }
        req.session.order = [];
        res.redirect('/user/myprofile');
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
    if(req.session.user != undefined && req.session.user.role=='admin'){
        let temp = await Orders.findOne({customer: req.body.customer, _id : req.body.id})
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
    res.redirect('/admin/orders')
   }
    else res.redirect('/admin/orders?message="Order was not found"');
}
else res.redirect('/admin/login?message="Must be logged in as admin to view this page"');
    }

    const remove = async (req,res)=>{
        if(req.session.user != undefined && req.session.user.role=='admin'){
      
          const order = await Orders.findOneAndRemove({ _id: req.query.id });
      
         if (order) {
           console.log(order);
           res.redirect('/admin/orders');
         } else {
           console.log('No order found');
           res.redirect("/admin/orders?message='Could not delete order'"); 
          }
        }
        else res.redirect("/admin/login?message = 'Must be logged in as admin to view this page'");
      }


module.exports = {addOrder, getOrders, displayOrders, progress, remove, batch}
