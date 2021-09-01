const Comment = require('../models/comment');
const Post = require('../models/post');
const { post } = require('../routes/posts');

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



module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){
            
            // Since we need to delte the comment id from the post comments array also therefore we frist require to 
            //save the postid of the to which our comment belong to and then later 
            //delete that comment from the array

            let postId = comment.post;

            comment.remove();

            Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
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