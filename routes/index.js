const express = require('express')
const app = express();
const router = express.Router();
const session = require('express-session')
router.use(session({ secret: 'Your_Secret_Key', resave: false,
saveUninitialized: true }))



router.get('/', (req,res)=>{
    res.render('index', { user: (req.session.user === undefined ? "" : req.session.user) })
})
router.get('/support', (req,res)=>{
    res.render('help' ,{ user: (req.session.user === undefined ? "" : req.session.user) })
})
router.get('/store', (req,res)=>{
    res.render('store', { user: (req.session.user === undefined ? "" : req.session.user) })
});
module.exports = router
app.use(function(req,res,next){ 
});