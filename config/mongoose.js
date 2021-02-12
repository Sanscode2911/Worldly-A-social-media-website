const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/worldly_development_db');
const db= mongoose.connection;
db.on('error',console.error.bind('console','error binding to db'))
db.once('open',function(){
    console.log("successfully connected to db");
})
module.exports=db;