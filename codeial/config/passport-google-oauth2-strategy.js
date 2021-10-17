const passport = require('passport');
// passport-google-oauth is the combination of two strategy one is Oauth20 and the other one is Oauth1                                                      // specific strategy
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// used to genrate random passpwowrd
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./enviroment');
//Tell passport to use a new strategy for google login
passport.use(new googleStrategy({
clientID : env.google_client_id,
clientSecret : env.google_client_secret ,
callbackURL: env.google_call_back_url
    
},//Access token is nothing but the jwt token genrated by google auth
// Refresh token is been used when our acccess token exprires
  function(accessToken,refreshToken,profile,done){
// Profile is going to contain the user info
// An profile.email could have multiple emails in it as a user could have multiple  
     //find the user
     User.findOne({email: profile.emails[0].value}).exec(function(err,user){
         if(err){
             console.log("Error in google strategy passport",err)
             return
         }
         //Using access token we could login again frrom another device so keep it safe
         console.log(accessToken, refreshToken);
         console.log(profile);
         if(user){
             // if found set this user as req.user
             return done(null,user);

         }else{
             //if not found create the user and set it as req.user
             User.create({
                 name: profile.displayName,
                 email: profile.emails[0].value,
                 password : crypto.randomBytes(20).toString('hex')

             },function(err,user){
                 if(err){
                    console.log("Error in creating passport in google strategy passport",err)
                    return
                }
                return done(null, user);
                 
             });
         }
     })


  }

))


module.exports = passport;