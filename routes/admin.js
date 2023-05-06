const express = require('express')
const router = express.Router()

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
module.exports = router