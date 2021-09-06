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
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        // Checking it whether its an xml http request or not
        if( req.xhr){

            return res.status(200).json({
                data: {
                    post : post,
                    message : "Post created "
                }
            })
        }


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
    
                await Comment.deleteMany({post: req.params.id})
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


