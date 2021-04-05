const passport= require('passport');
const googleStratergy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


//tell passport to use a new stratergy for google login
passport.use(new googleStratergy({
    clientID : "478807589613-0vc6e6n5hj6lg06lr1qtl3ma68kfhfbf.apps.googleusercontent.com",
    clientSecret : "1BdiCX_GQ9e9HyfI5KUM7VLY",
    callbackURL : "http://localhost:8000/users/auth/google/callback"
},

function(accessToken,refreshToken,profile,done){
    //find a user
    User.findOne({email : profile.emails[0].value}).exec(function(err,user){
        if(err){console.log('Error in google stratergy passport',err);return;}

        console.log(profile);

        if(user){
            //if found set this user as req.user
            return done(null,user);
        }else{
            //if not found, create the user and set it as req.user
            User.create({
                name : profile.displayName,
                email : profile.emails[0].value,
                password : crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log('Error in creating user google stratergy passport',err);return;}

                return done(null,user);
            });
        }

    });
}



))

module.exports = passport;