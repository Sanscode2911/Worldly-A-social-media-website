const passport = require('passport');

const LocalStratergy=require('passport-local').Strategy;

const User = require('../models/user');
const { user } = require('./mongoose');
//authenticate using local stratergy
passport.use(new LocalStratergy({
    usernameField:'email'},
    function(email,password,done){
//find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                console.log("ERROR-->PASSPORT");
                return done(err);
            }
            if(!user||user.password!=password){
                console.log("User/password] doesn't exist-->passport")
                return done(null,false)
            }
            return done(null,user);
        })
    }
    
    ));

    //serializing user to create cookies of given id
    passport.serializeUser(function(user,done){
        done(null,user.id);
    });
    //deserializing existing user cookies
    passport.deserializeUser(function(id,done){
        User.findById(id,function(err,user){
            if(err){
                console.log("ERROR IN DESERIALIZING-->PASSPORT")
                return done(err);
            }
            return done(null,user);

        })
    })
    //check if the user is authenticated
    passport.checkAuthentication=function(req,res,next){
       if(req.isAuthenticated()){
           return next();
       } 
       //if the user is not signed in
       return res.redirect('/users/sign-in')
    }
    passport.setAuthenticatedUser=function(req,res,next){
        if(req.isAuthenticated()){
            //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
            res.locals.user=req.user;
        }
        next();
    }
    module.exports=passport;