const express = require('express');
const app=express();
const cookieParser= require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//require to encrpt the user cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);

app.use(express.static('/assets'))
// app.use(cookieParser());

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine;
app.set('view engine','ejs');
app.set('views','./views')

//middleware for encrption of the session cookies
app.use(session({
    name:'codeial',
    //this is key which is used while encrption
    secret:'blahsomething',
    //prevent setting up extra data in the session cookie
    saveUninitialized:false,
    //prevent the rewrittin of the data even when it is not been chsngrd
    resave:false,
    cookie:{
        maxAge:(1000 *60 *100)
    }
    
}));

app.use(passport.initialize());
app.use(passport.session());
//This is described in the passport.js
app.use(passport.setAuthenticatedUser);
  

// use express router
app.use('/',require('./routes'))  

app.listen(port, function(err){
    if(err){
        console.log(`an error is been discovered : ${err}`)
    }

    console.log(`your server is up and running on port : ${port}`)
})
