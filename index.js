const express=require('express');
const app=express();
const port=8000;
app.use('/',require('./routes/index'))
app.listen(port,function(err){
    if(err){
        console.log("ERROR IN STARTING SERVER",err);
    }
    else{
        console.log("SERVER UP AND RUNNING AT PORT : ",port);
    }
});