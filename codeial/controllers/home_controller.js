
const Post = require ('../models/post');

module.exports.home=function(req,res){

    Post.find({},function(err,posts){
        if(err){
            console.log("error found");
            return;
        }return res.render('home.ejs',{

            title:"CODEIAL | Home",
            posts: posts

        });
    });
    
    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });
    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // })
    
}