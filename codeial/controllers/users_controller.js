const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile=function(req,res){
    console.log('inside profile ,usercontroller')

        User.findById(req.params.id,function(err, user){

            res.render('profile.ejs',{
                title:'PROFILE',
                profile_user: user
            });
    
        })

    }

    module.exports.update = async function(req,res){
    //     if(req.user.id == req.params.id){

    //         User.findByIdAndUpdate(req.params.id, req.body ,function(err,user){
    //             return res.redirect('back');
    //         });

    //     }else{
    //         return res.status(401).send('unauthorized');
    //     }
    // }
    
        if(req.user.id == req.params.id){
            try{
                let user = await User.findById(req.params.id); 
                //To access the body params we couldnt access it directly as the form is an multipart form so thats why therefore our body parser fails in this case 
                User.uploadedAvatar(req,res,function(err){
                    if(err){
                        console.log('********** multer Error :',err)
                    }
                    //This multer is helping us read the the req.body which wasnt possible without it
                    console.log(__dirname);
                    console.log(req.file)
                    user.name = req.body.name;
                    user.email = req.body.email;

                    if(req.file){
       
                        if(user.avatar){
                                         // Vailidating a string as a path
                            fs.unlinkSync(path.join(__dirname,'..',user.avatar))
                        }
                        //This is saving the path of the file into the avatar feild in the user
                        user.avatar = User.avatarPath +'/'+ req.file.filename
                    }
                    user.save();
                    return res.redirect('back')
                })

            }catch(err){
                req.flash('error',err)
                console.log('Error',err)
            }


        }else{
            res.flash('error','unauthorized');
            return res.status(401).send('unauthorized');
        }
    }



module.exports.signup= function(req,res){
    console.log(req.user)
    //This will prevent showing the signin/signup page when the user is been loggedin or signed in
    if(req.isAuthenticated()){
        return res.redirect('/users/signin')
    }
    res.render('user_sign_up.ejs',{
        title:'Codeial! Sign Up'
    })
}



module.exports.signin= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    res.render('user_sign_in.ejs',{
        title:'Codeial! Sign In'
    })
}

// Get Sign Up Data
module.exports.create = function(req,res){
     if(req.body.password != req.body.confirm_password){
         return res.redirect('back');
     }
    console.log("op",req.body)
     User.findOne({email: req.body.email},function(err,user){
         if(err){
             console.log('error in finding user in signing up');
             return res.redirect('back');
         }
         if(!user){
             User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');
                    return res.redirect('back');
                }

                return res.redirect('/users/signin')
             })
         }else{
             return res.redirect('/users/signin')
         } 
     })

     
}


// Sign In AND CREATE A SESSION FOR THE USER 
module.exports.createSession= function(req,res){
    //This messsage need to transfered to the responce,we will use an coustum middelware for the same
    console.log('inside createsession controller');
    console.log(req.user);
              //  TYPE           MESSAGE
    req.flash('success','Logged in Successfully');
    // return res.redirect('/users/profile');
    return res.redirect('/');
}


module.exports.destroySession = function(req,res){
    req.logout()
    req.flash('success','Logged out Successfully!!!');
    //This messsage need to transfered to the responce,we will use an coustum middelware for the same
    return res.redirect('/')
}
