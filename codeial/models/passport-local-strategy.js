 const passport = require('passport');

 const localStrategy = require('passport-local').Strategy;

 const User = require('../models/user');


 //authetication using passport
 passport.use(new LocalStrategy({

    //unique field through which we will find the user(here email)
     usernamefield: 'email'
    },
    function(email, password, done){
        //finding a user and establishing there identity
        User.findOne({email:email},function(err, user){
           if(err){
               console.log("error in finding user --> Passport");
               return done(err);
           }

           if(!user || user.password!= password){
               console.log('Invalid Username/Password');
               return done(null, false);
           }

           return done(null,user)
        });
    }
      
 ));

 //serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
})
 // desrialing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log("error in finding user --> Passport");
            return done(err);
        }

        return done(null, user);
    })
});

module.exports = passport