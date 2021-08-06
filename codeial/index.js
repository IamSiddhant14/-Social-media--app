const express = require('express');
const app=express();
const cookieParser= require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');


app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
// use express router
app.use('/',require('./routes'))  
app.use(express.static('/assets'))
// app.use(cookieParser());

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//set up the view engine;
app.set('view engine','ejs');
app.set('views','./views')

app.listen(port, function(err){
    if(err){
        console.log(`an error is been discovered : ${err}`)
    }

    console.log(`your server is up and running on port : ${port}`)
})
