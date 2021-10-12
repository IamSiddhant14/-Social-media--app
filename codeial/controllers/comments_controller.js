const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer')
const { post } = require('../routes/posts');
const commentEmailWOrker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

// module.exports.create = function(req,res){
//     //Here req.body.post refer to the input type post which is post.id
//     Post.findById(req.body.post,function(err,post){

//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             },function(err,comment){
//                 //handle error
//                 if(err){
//                     console.log("Error in comments controllers")
//                 }

//                 //adding comment to the comments array
//                 post.comments.push(comment);

//                 //updating changes and saving it
//                 post.save();

//                 res.redirect('/');
//             });
//         }
//     })
// }

module.exports.create = async function(req,res){
    //Here req.body.post refer to the input type post which is post.id

    try{

        let post = await Post.findById(req.body.post)

        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);

            //updating changes and saving it
            post.save();
                comment = await comment.populate('user','name email').execPopulate();
                // commentsMailer.newComment(comment);
                //The above line/job is been put into the queue if the queue exisist and if it does then the queue is been created
                               //Name of queue
                let job = queue.create('emails',comment).save(function(err){
                    if(err){
                        console.log('Error in creating a queue');
                    }

                    console.log('job enqueued',job.id);
                });

                req.flash('success','comment added');
                //adding comment to the comments array


                res.redirect('/');
            };
        }catch(err){
            req.flash('error','we run into an error')
            console.log("Error",err)

        }
    }




module.exports.destroy = async function(req, res){

    let comment = await Comment.findById(req.params.id)
        if (comment.user == req.user.id){
            
            // Since we need to delete the comment id from the post comments array also therefore we frist require to 
            //save the postid of the to which our comment belong to and then later 
            //delete that comment from the array

            let postId = comment.post;

            comment.remove();

            await Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}})
            req.flash('success','comment deleted')
            return res.redirect('back');
            
        }else{
            req.flash('error','you run into an error')
            return res.redirect('back');
        }
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