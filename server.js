const express= require('express')
const app = express()
const expressLayouts= require('express-ejs-layouts')
const path = require('path')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const adminRouter = require('./routes/admin')


app.set('view engine','ejs');
app.set('views',__dirname +'/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


app.use('/',indexRouter)
app.use('/user',userRouter)
app.use('/admin',adminRouter)


app.listen(process.env.PORT || 3000)