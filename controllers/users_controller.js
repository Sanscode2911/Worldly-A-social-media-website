const { user } = require('../config/mongoose');
const User = require('../models/user');
module.exports.profiles=function(req,res){
   return res.render('user',{
       title:'users'
   });
}
module.exports.posts=function(req,res){
    res.end('<h1>posts</h1>')
}
module.exports.signUp=function(req,res){
    return res.render('user_signUp',{
     title:"worldly | SignUp"
    })
}
module.exports.signIn=function(req,res){
   return res.render('user_signIn',{
       title:"worldly | SignIn"
   })
}
//enter sign up details
module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log("ERROR IN FINDONE EMAIL FUNCTION");return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("ERROR IN creating user");return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}
//enter sign in details
module.exports.createSession=function(req,res){
    //TODO
}