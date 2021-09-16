const mongoose = require('mongoose');
//               mongoDB which is running in our local machine, name of the local MongoDB database which is codeial_development in this case
mongoose.connect('mongodb://localhost/codeial_development'); 
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to the MOngodb"));

db.once('open',function(){
    console.log('Connected To The Database:: MongoDB')
})

module.exports = db;