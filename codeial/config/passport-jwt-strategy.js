//This file is responsible for takig the jwt from the header and putting it into the req.user
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

 //Defining the options
let opts ={
    //Header is a list of keys which has one of the key as autherisation which futher has an key as bearer which is having the jwt token and we are extracting that token from there
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()  ,
    //Key used for decrption
    //Should never be changed after creating a token as then we wont be able to decrypt the token
    secretOrKey : 'codeial'
}
                                          //This is the payload of the JWT
passport.use(new JWTStrategy (opts,function(jwtPayLoad, done){

      User.findById(jwtPayLoad._id,function(err,user){
          if(err){
              console.log("Error in finding user from JWT");
              return  done(null,false)
          }

          if(user){
              return done(null,user)
          }else{
              return done(null,false);
          }
      })

}));

module.exports = passport;