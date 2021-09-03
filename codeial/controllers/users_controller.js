const User = require('../models/user');


module.exports.profile=function(req,res){
    console.log('inside profile ,usercontroller')

        User.findById(req.params.id,function(err, user){

            res.render('profile.ejs',{
                title:'PROFILE',
                profile_user: user
            });
    
        })

    }

    module.exports.update = function(req,res){
        if(req.user.id == req.params.id){

            User.findByIdAndUpdate(req.params.id, req.body ,function(req,user){
                return res.redirect('back');
            });

        }else{
            return res.status(401).send('unauthorized');
        }
    }



module.exports.signup= function(req,res){
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
    console.log('inside createsession controller')
    // return res.redirect('/users/profile');
    return res.redirect('/');
}


module.exports.destroySession = function(req,res){
    req.logout()

    return res.redirect('/')
}
