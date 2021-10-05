//The sign-in part/authentication is been handle in this part using the passport.js 
//which help in setting up an session cookies

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// require schema 
const User = require('../models/user');


//authetication using passport
passport.use(new LocalStrategy({

    //unique field through which we will find the user(here email from schema)
    usernameField: 'email',
    passReqToCallback: true
    //provide use the ability to pass req as a frist argument to the call back function
},
    //here this email and password are the users credentials
    //done is a call back function wich reports to passport.js where authentication was successfull or not
    function (req, email, password, done) {
        //finding a user and establishing there identity
        User.findOne({ email: email }, function (err, user) {
            if (err) {
                //loging the error on the console
                req.flash('error',err);
                return done(err);
            }
            // if user is not found or the password dont match the password entered
            
            if (!user) {
                req.flash('error','Invalid Username/Password');
                //Here null means no error
                //window.alert("USER NOT FOUND PLEASE SIGNUP")
                return done(null, false);
                // here authentication is false means user is not found
            }
            if (user.password != password) {
                console.log('Invalid Username/Password');
                //Here null means no error
                return done(null, false);
                // here authentication is false means user is not found
            }
            // if user is found return user
            //The frist argument in done is the error,which is null in this case
            console.log(`#########from passport local##### ${user}`);
            
            return done(null, user);
        });
    }

));

//serializing the user to decide which key is to be kept in the cookies when sending the cookie to the browser where our key is been encryypted in the cookie
passport.serializeUser(function (user, done) {
    //injecting the userid in the cookie in the encripted formate
    console.log(`*******serializeUser******* ${user}`);
    done(null, user.id);
});
// desrialing the user.id from the key which is been send via a cookies when the request is been send to the server,here we frist find the user from the encrpted key and then verify it with the DB
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("error in finding user --> Passport");
            return done(err);
        }
        // returning the user
        console.log('*******dserializeUser*******')
        return done(null, user);
    });
});

//sending data of the current user to the views
// check if the user is authenticated
//This is an middleware
passport.checkAuthentication = function (req, res, next) {
    //if the user is signed in ,then pass on the request to the next function which is controller's action
    //passport put an method on req called isAuthenticated
    if (req.isAuthenticated()) {
        return next();
    }

    //if the user is not signed in

    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        //req.user contain the current signed in user from the session and we are just sending this to the local for the views
        console.log("from passport.setAuthenticatedUser")
        // console.log(req)
        //If authentication is succeeds,the req.user property will be set to the authenticated user.(This all action is been performed by passport.js)
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;

