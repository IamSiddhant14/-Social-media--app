const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
    //Here req.body.post refer to the input type post which is post.id
    Post.findById(req.body.post,function(err,post){

        if(post){
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            },function(err,comment){
                //handle error
                if(err){
                    console.log("Error in comments controllers")
                }

                //adding comment to the comments array
                post.comments.push(comment);

                //updating changes and saving it
                post.save();

                res.redirect('/');
            });
        }
    })
}


// const Comment = require('../models/comment');
// const Post = require('../models/post');

// module.exports.create = function(req, res){
//     //Here req.body.post refer to the input type post which is post.id
//     Post.findById(req.body.post, function(err, post){

//         if (post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 // handle error
      
//                 //adding comment to the comments array
//                 post.comments.push(comment);

//                  //updating changes and saving it
//                 post.save();

//                 res.redirect('/');
//             });
//         }

//     });
// }