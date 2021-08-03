const User = require('../models/user');


module.exports.profile=function(req,res){
    res.send('<h1>Users Profile </h1>');
}

module.exports.signup= function(req,res){
    res.render('user_sign_up.ejs',{
        title:'Codeial! Sign Up'
    })
}
module.exports.signin= function(req,res){
    res.render('user_sign_in.ejs',{
        title:'Codeial! Sign In'
    })
}

// Get Sign Up Data
module.exports.create = function(req,res){
     if(req.body.password != req.body.confirm_password){
         return res.redirect('back');
     }

     User.findOne({email: req.body.email},function(err,user){
         if(err){
             console.log('error in finding user in signing up');return
         }
         if(!user){
             User.create(req.body,function(err,user){
                if(err){
                    console.log('error in creating user while signing up');return
                }

                return res.redirect('/users/signin')
             })
         }else{
             return res.redirect('back')
         } 
     })

     
}


// Sign In AND CREATE A SESSION FOR THE USER 
module.exports.createSession= function(req,res){

}

