const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//     content:{
//         type:String,
//         required:true
//     },
//     //what ever post will be created it would be linked to a user and here "type" is used to link it to the user schema
//     user:{
//         type:  mongoose.Schema.Types.ObjectId,
//         //The schema to refer to
//         ref: 'User'
//     }
// },{
//     timestamps: true
// });

// const Post = mongoose.model('Post',postSchema);
// module.export = Post;



const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    }
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;