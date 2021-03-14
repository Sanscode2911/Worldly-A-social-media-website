const Post = require('../models/post')
module.exports.home = function(req,res){
    //console.log(req.cookies);

//     Post.find({},function(err,posts){
//         return res.render('home',{
//             title:"Wordly | Home",
//             posts:posts
//     });
// });
//POPULATE THE USER OF EACH POST
Post.find({})
.populate('user')
.populate({
    path:'comments',
    populate:{
        path:'user'
    }
})
.exec(function(err,posts){
    return res.render('home',{
        title:"Wordly | Home",
        posts:posts
});
})
}
 