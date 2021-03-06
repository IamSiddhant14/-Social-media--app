    const Post = require ('../models/post');
const Comment = require('../models/comment')

// module.exports.create = function(req,res){
//     console.log("inside post conrtoller",req.body.content,req.user._id)
//     Post.create({
//         content:req.body.content,
//         user:req.user._id
//     },function(err,post){
//         if(err){
//             console.log('error in creating a post')
//             return;
//         }
//         return res.redirect('back');
//     });
// }
module.exports.create = async function(req,res){

    try{
        // asigning it to an variable
        console.log("For clarification",req.body,req.user)
        let post = await Post.create({
            content:req.body.content, 
            user:req.user._id
        });
        post = await post.populate('user').execPopulate();
        req.flash('success','Post created')

        // Checking it whether its an xml http request or not
        if(req.xhr){
           console.log('printing from ajax of post controller')
           //We always return json with a status
            return res.status(200).json({
                data: {
                    post : post,
                },
                //We always return json with a message
                message : "Post created "
            });
        };


        req.flash('success','Post publish')
        return res.redirect('back');

    }catch(err){
        
        console.log(Error,'err');
        req.flash('error',err)
        return;

    }
}

// module.exports.destroy=function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         if(post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id},function(err){

//                 return res.redirect('back');
//             });

//         }else{
//             return res.redirect('back')
//         }
//     })
// }


module.exports.destroy= async function(req,res){

    try{

        let post = await Post.findById(req.params.id)

        if(post.user == req.user.id){
                post.remove();
                console.log("opp")
                await Comment.deleteMany({post: req.params.id})
                
                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            post_id: req.params.id
                        },
                        message:"Post deleted"
                    })
                }

                req.flash('success','Post and associated comments deleted')
                return res.redirect('back');
        }else{
               req.flash('error','You cannot delete this Post ')
               return res.redirect('back')
        }
    }catch(err){
        req.flash('error',err)
        console.log('Error',err)

    }
}


