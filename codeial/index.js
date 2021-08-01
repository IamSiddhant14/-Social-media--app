const express = require('express');
const app=express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// use express router
app.use('/',require('./routes'))  
app.use(express.static('/assets'))
//set up the view engine;
app.set('view engine','ejs');
app.set('views','./views')

app.listen(port, function(err){
    if(err){
        console.log(`an error is been discovered : ${err}`)
    }

    console.log(`your server is up and running on port : ${port}`)
})
