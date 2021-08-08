 //The sign-in part/authentication is been handle in this part using the passport.js 
 //which help in setting up an session cookies
 
 const passport = require('passport');
 const LocalStrategy = require('passport-local').Strategy;
// require schema 
const User = require('../models/user');


 //authetication using passport
 passport.use(new LocalStrategy({

    //unique field through which we will find the user(here email from schema)
     usernameField: 'email'
    },
    //here this email and password are the users credentials
    //done is a call back function wich reports to passport.js where authentication was successfull or not
    function(email, password, done){
        //finding a user and establishing there identity
        User.findOne({email:email},function(err, user){
           if(err){
               //loging the error on the console
               console.log("error in finding user --> Passport");
               return done(err);
           }
        // if user is not found or the password dont match the password entered
           console.log(`############## ${user}`);
           if(!user){
               console.log('Invalid Username/Password');
               //Here null means no error
            //    window.alert("USER NOT FOUND PLEASE SIGNUP")
               return done(null, false);
               // here authentication is false means user is not found
           }
           if(user.password != password){
            console.log('Invalid Username/Password');
            //Here null means no error
            return done(null, false);
            // here authentication is false means user is not found
        }
        // if user is found return user
        //The frist argument in done is the error,which is null in this case
           return done(null,user);
        });
    }
      
 ));

 //serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //injecting the userid in the cookie in the encripted formate
    console.log(`************** ${user}`);
    done(null, user.id);
});
 // desrialing the user from the key in the cookies 
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("error in finding user --> Passport");
            return done(err);
        }
// returning the user
        return done(null, user);
    });
});

//sending data of the current user to the views
// check if the user is authenticated
//This is an middleware
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in ,then pass on the request to the next function which is controller's action
    //passport put an method on req called isAuthenticated
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in

    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contain the current signed in user from the session and we are just sending this to the local for the views
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;

