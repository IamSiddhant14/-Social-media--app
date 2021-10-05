const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index= async function(req,res){


    let posts = await Post.find({})
    //help us in sorting in the newest frist manner
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });


    return res.json(200,{
        message:"List of posts",
        posts:posts
    })
}



module.exports.destroy= async function(req,res){

    try{

        let post = await Post.findById(req.params.id)

        if(post.user == req.user.id){
                post.remove();
                console.log("From post_api.js")
                await Comment.deleteMany({post: req.params.id})
                

    
                return res.json(200,{
                    message:"post and associated comments deleted"
                })
        }else{
            // req.flash('error','You cannot delete this Post ')
            // return res.redirect('back')
            return res.json(401,{
                message: "internal server error"
            })
            }

    }catch(err){
        
        return res.json(500,{
            message:"Internal server Error"
        })
        

    }
          
}

 