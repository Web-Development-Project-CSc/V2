require("dotenv").config();
const express= require('express')
const app = express()
const expressLayouts= require('express-ejs-layouts')
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const mongoose  = require('mongoose')
const session = require('express-session')
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'Your_Secret_Key', resave: false,
saveUninitialized: true }))
mongoose.connect(process.env.DBCONNECT.toString()).then(result =>{console.log("connected")}).catch(err => {console.log(err)})
app.use(express.urlencoded({extended:true}))
app.use(express.json());    
app.set('view engine','ejs');
app.set('views',__dirname +'/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use('/',indexRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)
app.use((req, res) => {
res.status(404).render("notfound",{layout: false});
});
app.listen(80 || process.env.PORT );