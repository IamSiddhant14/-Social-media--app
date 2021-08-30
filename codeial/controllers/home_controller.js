
const Post = require ('../models/post');

module.exports.home=function(req,res){

    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log("error found");
    //         return;
    //     }return res.render('home.ejs',{

    //         title:"CODEIAL | Home",
    //         posts: posts

    //     });
    // });
    //insted of fetch just the id of the user what if we fetch the entire user along with all of its feilds -->
    // we willl take the help of mongoose populate for this -->
    //we could pre populate the refered object here user in this case
    // here we have populated each post's user with all of its feilds since we have the id of the user who created this post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts
        });
    })
    
}