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

router.get('/', (req,res)=>{
    res.render('dashboard',{layout: false})
})

router.get('/products' , (req,res)=>{
    res.render('products',{layout: false})
})

router.get('/users', (req,res)=>{
    res.render('users',{layout: false})
})

router.get('/store', (req,res)=>{
    res.render('store',{layout: false})
})
router.get('/upload', (req,res)=>{
    res.render('upload',{layout: false})
})
router.post('/upload',upload.single('image'), (req,res)=>{
    res.send('uploaded')
})
module.exports = router