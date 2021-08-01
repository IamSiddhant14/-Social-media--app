const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connecting to the MOngodb"));

db.once('open',function(){
    console.log('Connected To The Database:: MongoDB')
})

module.exports = db;