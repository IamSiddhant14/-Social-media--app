const mongoose = require('mongoose');
const multer = require('multer');
//  User profile avatar would be uploaded at a diffrent place and the post will also be uploaded at a diffrent place 
const path = require('path');
//  place where our avatar would be saved
//  Using this path module this string is been converted into an path
const AVATAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    avatar:{
        // The file path is been saved in this feild
        type:String
    }
},{
    timestamps:true
});

//Defining the storage propeties for multer
let storage = multer.diskStorage({
    // where the file is going to be stored
    destination: function (req, file, cb) {
        // __dirname is the location from where the file is running from the directory here the location will be of the file user.js
      cb(null,path.join(__dirname,"..",AVATAR_PATH))
    },
    // Filename
    filename: function (req, file, cb) {
        //                 append the current time in the filename to the precion of mile second from 1970 as as to avoid repetion of the file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //                Avatar
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
  
// Static function could be called on the whole class instead of the instance of that class
                                      // This basically attaches the disk storage on multer in the storage properties defined above
                                      // Here the multer is been called providing storage key as the value storage
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar')//To send only a single file instaed of an array of files
//we want this avatar path to be availble publicly
userSchema.statics.avatarPath = AVATAR_PATH;


                            //Giving the name of the schema
const User = mongoose.model('User',userSchema);

module.exports= User;

