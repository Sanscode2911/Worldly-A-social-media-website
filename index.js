const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db = require('./config/mongoose')
const expressLayouts=require('express-ejs-layouts');
const { urlencoded } = require('express');
app.use(expressLayouts);
app.use(express.urlencoded());
app.use(cookieParser());
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.static('./assets'));
app.use('/',require('./routes/index'))
app.set('view engine','ejs')
app.set('views','./views')
app.listen(port,function(err){
    if(err){
        console.log("ERROR IN STARTING SERVER",err);
    }
    else{
        console.log("SERVER UP AND RUNNING AT PORT : ",port);
    }
});