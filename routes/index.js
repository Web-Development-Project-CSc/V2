const express = require('express')
const app = express();
const router = express.Router();
const session = require('express-session')
router.use(session({ secret: 'Your_Secret_Key', resave: false,
saveUninitialized: true }))



router.get('/', (req,res)=>{
    res.render('index')
})
router.get('/support', (req,res)=>{
    res.render('help')
})
router.get('/store', (req,res)=>{
    res.render('store')
});
module.exports = router
app.use(function(req,res,next){ 
});