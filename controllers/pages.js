const bcrypt = require('bcrypt')
const Accounts = require('../models/accounts');
const Products = require('../models/products');
const Orders = require('../models/orders');
const Favorites = require('../models/wishlist');
const FAQs = require('../models/faq');
const Requests = require('../models/requests');


const notLogged = (req,res) =>{
    res.redirect('/user/login?message="Must be logged in to view this page"')
}
const notAnAdmin = (req,res) =>{
    res.redirect('/admin/login?message="Must be logged in as admin to view this page"')
}


const goToLogin = (req,res)=>{
    res.render('login',  { message: '', layout: false})
}
const goToSignup =  (req,res)=>{
    res.render('signup',  { message: '', layout: false});
}
const logout =  (req, res) => {
    if (req.session.user !== undefined) req.session.destroy();
     res.redirect('/');
}


const termsOfPrivacy = (req,res)=>{ res.render('privacyPolicy',{ layout:false} )}
const support = (req,res)=>{ res.render('help' ,{ message: '', user: (req.session.user === undefined ? "" : req.session.user) })}
const home = async (req,res)=>{
    let q=Products.find()
    q.sort({numPurchases: -1})
    q.limit(3).then(prods =>{
        res.render('index', { message: '', user: (req.session.user === undefined ? "" : req.session.user) , prods: (prods === null ? "" : prods) })
    })
}
const store = (req, res) => {
    let pageNumber = parseInt(req.params.page);
    let prods = null
    Products.find().then(result =>{
    if(pageNumber>result.length/9) pageNumber = result.length/9;
    if(pageNumber<1) pageNumber = 1;
    prods=result.slice((pageNumber-1)*9, ((pageNumber-1)*9)+9);
    res.render('store', { message: '', user: (req.session.user === undefined ? "" : req.session.user) , 
    prods: (prods === null ? "" : prods),
    current_page: pageNumber,
    total_page: Math.ceil(result.length/9)})
    }).catch(err => {console.log(err)}).then()
}


const forgetPassword  = (req,res)=>{res.render('forgetpassword',  {message: '', layout: false})}
const resetPassword = (req,res)=>{res.render('confirmationPage',  {message: '', layout: false})}
const getEmail = (req,res)=>{
    let email = req.body.mail
    Accounts.findOne({ email: email}).then(async result=>{
        if(result) res.send({ result: 'found' })
        else res.send({ result: 'not found' })
        })
}
const getPassword = (req,res)=>{
    let email = req.body.mail
    let password = req.body.pass
    Accounts.findOne({ email: email}).then( async result => {
        if(result) res.send({result: 'found' , pass: await bcrypt.compare( password, result.password )})
        else res.send({result: 'not found',pass: ''})
    })
}


const myProfile = (req,res)=>{
    if (req.session.user !== undefined){ 
    Orders.find({customer : req.session.user._id}).then(result=>{
    Favorites.find({customer : req.session.user._id}).then(favorites=>{
    res.render('myProfile', {message: '', user: req.session.user ,layout: false, orders: (result === null ? "" : result) , favorites: (favorites === null ? "" : favorites)});
    })}).catch(err=>{
        console.log(err)
        res.redirect("/user/myprofile?message= 'Could not load orders'")
    }
    )}
    else notLogged
}
const addToCart = (req,res)=>{
    if (req.session.user !== undefined){
               req.session.order = req.body.order;
               res.session = req.session;
               res.redirect('/user/cart');        
            }
        else notLogged;
    }
const getCart = (req,res)=>{
    if (req.session.user !== undefined) 
    res.render('cart',  { message: '', layout: false, orders: (req.session.order === undefined ? "" : req.session.order)});
    else notLogged;
}

const adminLogin = (req, res) => {res.render('login', { layout: false})}
const dashboard = (req, res) => {
    if (req.session.user !== undefined && req.session.user.role === 'admin') {
      Products.find().sort({numPurchases: -1}).then( prods =>{
        Orders.find().sort({createdAt: -1}).then( ords =>{ 
          FAQs.find().sort({createdAt: -1}).limit(5).then( faq =>{
          Requests.find().sort({number: -1}).limit(5).then(reqs => {
            res.render('dashboard', { message: '', layout: false, 
            user: req.session.user , 
            prods: (prods === null ? "" : prods) , 
            orders: (ords === null ? "" : ords) , 
            faqs: (faq === null ? "" : faq),
          requests: (reqs === null ? "" : reqs)})})
          }) })})}
      else notAnAdmin
  }
const allOrders = async (req,res) => {
    if(req.session.user != undefined && req.session.user.role == "admin")
     {
    let order = await Orders.find()
    if(order)
    res.render("orders" , { layout : false , orders : (order === null ? "" : order)});
    else{
     res.redirect("/admin?message='Could not load orders'")
    }
    }
    else notAnAdmin
}
const allProducts =  (req, res) => {
    if (req.session.user !== undefined && req.session.user.role === 'admin') {
      Products.find().then(prods =>{
      res.render('products', { message: '', layout: false, user: req.session.user , prods: (prods === null ? "" : prods)})});
    } else notAnAdmin
  }
const allUsers = (req, res) => {  
    if (req.session.user !== undefined && req.session.user.role === 'admin') {
      Accounts.find().then(accounts =>
      res.render('users',{ layout: false, user: req.session.user , accounts: accounts}))
    } else notAnAdmin
  }


module.exports =  {
    PUBLIC: { goToLogin, goToSignup, notLogged, notAnAdmin, logout },
    ROOT: { home, support, store, termsOfPrivacy },
    USER: { getEmail, getPassword, forgetPassword, resetPassword, myProfile, addToCart, getCart},
    ADMIN: { adminLogin, dashboard, allUsers, allProducts, allOrders }
}