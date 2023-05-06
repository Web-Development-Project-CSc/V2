const express= require('express')
const app = express()
const expressLayouts= require('express-ejs-layouts')
const path = require('path')
const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const storeRouter = require('./routes/store')


app.set('view engine','ejs');
app.set('views',__dirname +'/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


app.use('/',indexRouter)
app.use('/store',storeRouter)
app.use('/user',userRouter)
app.listen(process.env.PORT || 3000)