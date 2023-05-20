const express = require('express')
const router = express.Router()
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/IMAGES/');
    }
    ,filename: function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});
const session = require('express-session')
router.use(session({ secret: 'Your_Secret_Key', resave: false,
saveUninitialized: true }))


router.get('/', (req,res)=>{
    if(req.session.user !== undefined && req.session.user.role==='admin')
    res.render('dashboard',{layout: false}, { user: (req.session.user === undefined ? "" : req.session.user) })
    else res.redirect('admin/login')
})

router.get('/products' , (req,res)=>{
    if(req.session.user !== undefined && req.session.user.role==='admin')
    res.render('products',{layout: false}, { user: (req.session.user === undefined ? "" : req.session.user) })
    else res.redirect('login')
})

router.get('/users', (req,res)=>{
    if(req.session.user !== undefined && req.session.user.role==='admin')
    res.render('users',{layout: false}, { user: (req.session.user === undefined ? "" : req.session.user) })
    else res.redirect('login')
})


router.get('/login', (req,res)=>{
    res.render('login',  { layout: false}, { user: (req.session.user === undefined ? "" : req.session.user) })

})
router.post('/products',upload.single('image'), (req,res)=>{
    if(req.session.user !== undefined && req.session.user.role==='admin')
    res.render('products',{layout: false}, { user: (req.session.user === undefined ? "" : req.session.user) })
    else res.redirect('login')
})
module.exports = router