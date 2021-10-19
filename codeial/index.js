const express = require('express');
const app=express();
const env = require('./config/enviroment');
//for putting the logs in the file
const logger = require('morgan');
//used to read and write cookies
const cookieParser= require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
//connecting the odm with the database
const db = require('./config/mongoose');
//require to encrpt the userid (in this case)into the session cookie which is then send back to the browser
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy')
//This is used to store session cookies into the database so as to prevent signing in again when server is been reloded
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const path = require('path');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
//Set up the chat server to be used with socket.io.
//Requires an http server which has the express app passed to it.
const chatServer = require('http').Server(app);     
//This http server will be used in socket.io                                                     //Passing on this chat server to this file
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
//This server will be listning on a specific port,since socket connection is also happening along one port
chatServer.listen(5000);
console.log("Chat server is listning on port 5000")


//This middleware converts the sass file into css before putting it into the views file
if(env.name == 'devlopment'){

    app.use(sassMiddleware({
        //from where we will pick the scss file to convert into css
        src: path.join(__dirname, env.asset_path, 'scss'),
        //The place where we will put the converted scss files
        dest: path.join(__dirname, env.asset_path, 'css'),
        //To allow the visibily of the terminal (false in production)
        debug:true,
        //every thing in single or multiple lines(minified or not)
        outputStyle:'extended',
        //Where to look the css files 
        prefix:'/css' // Important --- Where prefix is at <link rel="stylesheets" href="/css/style.css"/>
    
        //This does not get compilned at the time of starting the server but at the time of reloading a page/rendering a page
    
    }));
    
}

// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,  //  Put false in production mode
//     outputStyle: 'extended',  // To not show in one line
//     prefix: '/css'   // Important --- Where prefix is at <link rel="stylesheets" href="/css/style.css"/>
// }));
//convert the form data field by the user into the form of req.body which was earlier encrpted
app.use(express.urlencoded());
//The cookie parser is used for reading and writting into cookies
app.use(cookieParser());
//this is used so as to load the layouts along with the ejs files

app.use(logger(env.morgan.mode , env.morgan.options))
app.use(expressLayouts);

app.use(express.static(env.asset_path));

//Made the upload part availblle to the browser
app.use('/uploads',express.static(__dirname+ '/uploads'));
console.log("######################################################",__dirname)
//This will extract the various Style adscript tags from the ejs file and to it into the defined 
//location in the layout file while combining the ejs and the layout file
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine;
app.set('view engine','ejs');
//./views means it is gone search in the neigbouring folders
app.set('views','./views')

//middleware for encrption of the session cookies
//mongostore is used to store session cookie in the DB
app.use(session({
    //Here codeial is the name of the cookie
    name:'codeial',
    //this is key which is used while encrption and decrption
    secret: env.session_cookie_key,
    //prevent setting up extra data in the session cookie
    saveUninitialized:false,
    //prevent the rewrittin of the data even when it is not been changed
    resave:false,
    cookie:{
        //Age of the session cookie
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

//Flash messages are stored in the session cookie and are been cleared in the very next request
//Flash message will be stored in the cookie which stores session info
//Before the redirecting to the page the flash message need to be setted up in the locals

app.use(flash());
//This middleware fetchs everything from the req.flash in the controllers and sets it into the res.locals.flash
app.use(customMware.setFlash);

// use express router
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        //`xyz ${err}` --This is string interpolation
        console.log(`an error is been discovered : ${err}`)
    }

    console.log(`your server is up and running on port : ${port}`)
})


