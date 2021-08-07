 const passport = require('passport');

 const localStrategy = require('passport-local').Strategy;
// require schema 
 const User = require('../models/user');


 //authetication using passport
 passport.use(new LocalStrategy({

    //unique field through which we will find the user(here email from schema)
     usernamefield: 'email'
    },
    //here this email and password are the users credentials
    // done is a call back function wich reports to passport.js where authentication was successfull or not
    function(email, password, done){
        //finding a user and establishing there identity
        User.findOne({email:email},function(err, user){
           if(err){
               //loging the error on the console
               console.log("error in finding user --> Passport");
               return done(err);
           }
        // if user is not found or the password dont match the password entered
           if(!user || user.password!= password){
               console.log('Invalid Username/Password');
               return done(null, false);
               // here authentication is false 
           }
        // if user is found return user
           return done(null,user)
        });
    }
      
 ));

 //serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //injecting the userid in the cookie in the encripted formate
    done(null, user.id);
})
 // desrialing the user from the key in the cookies 
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("error in finding user --> Passport");
            return done(err);
        }
// returning the user
        return done(null, user);
    })
});

module.exports = passport