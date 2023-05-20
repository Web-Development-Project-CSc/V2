require("dotenv").config();
const express= require('express')
const app = express()
const expressLayouts= require('express-ejs-layouts')
const path = require('path')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')
const mongoose  = require('mongoose')

mongoose.connect('mongodb+srv://flavouredmiu:webproject123@cluster0.t6ylmgo.mongodb.net/?retryWrites=true&w=majority')

app.set('view engine','ejs');
app.set('views',__dirname +'/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


app.use('/',indexRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)

app.use((req, res) => {
    res.status(404).render("notFound",{layout: false});
});
app.listen(3000 || process.env.PORT );