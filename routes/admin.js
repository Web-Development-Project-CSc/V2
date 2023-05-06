const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('dashboard')
})

router.get('/products' , (req,res)=>{
    res.render('products')
})

router.get('/users', (req,res)=>{
    res.render('users')
})

router.get('/store', (req,res)=>{
    res.render('store')
})
module.exports = router