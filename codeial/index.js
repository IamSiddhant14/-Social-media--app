const express = require('express');
const app=express();
//used to read and write cookies
const cookieParser= require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//connecting the odm with the database
const db = require('./config/mongoose');
//require to encrpt the user cookies
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
//This is used to store session cookiesinto the database so as to prevent signing in again when server is been reloded
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');

//This middleware converts the sass file into css before putting it into the views file
app.use(sassMiddleware({
    //from where we will pick the scss file to convert into css
    src:'./assets/scss',
    //The place where we will put the converted scss files
    dest:'./assets/css',
    //To allow the visibily of the terminal (false in production)
    debug:'true',
    //every thing in single or multiple lines(minified or not)
    outputStyle:'extended',
    //Where to look the css files 
    prefix:'/css'

    //This does not get compilned at the time of starting the server but at the time of reloading a page/rendering a page

}));
//convert the form data field by the user into the form of req.body
app.use(express.urlencoded());
//The cookie parser is used for reading and writting into cookies
app.use(cookieParser());
//this is used so as to load the layouts along with the ejs files
app.use(expressLayouts);

app.use(express.static('./assets'))

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine;
app.set('view engine','ejs');

app.set('views','./views')

//middleware for encrption of the session cookies
//mongostore is used to store session cookie in the DB
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
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codeial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongo setup ok');
        })
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
