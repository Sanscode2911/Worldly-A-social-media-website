const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db = require('./config/mongoose')
//used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo').default;
const sassMiddleware=require('node-sass-middleware');

app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assests/css',
    debug:true,
    outputStyle:'extended',
    prefix:'/css'
}))



app.use(express.urlencoded());


app.use(cookieParser());

app.use(express.static('./assets'));
const { urlencoded } = require('express');
const { Store } = require('express-session');
app.use(expressLayouts);


//extract styles and scripts from sub pages
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//set up view engine
app.set('view engine','ejs')
app.set('views','./views')
//mongo store is used to store session cookie in db
app.use(session({
    name:'worldly',
    //TODO CHANGE THE SECRET BEFORE DEPLOYMENT IN PRODUCTION MODE
    secret:'blahsomething',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/test-app' },{
        mongooseConnection:db,
        autoRemove:'disabled'
    },
        function(err){
            if(err){
                console.log(err || 'connect mongodb setup OK');
            }
        }
    )
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser)
//use express router
app.use('/',require('./routes/index'))
app.listen(port,function(err){
    if(err){
        console.log("ERROR IN STARTING SERVER",err);
    }
    else{
        console.log("SERVER UP AND RUNNING AT PORT : ",port);
    }
});