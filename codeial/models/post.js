const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    //Whenever we are loading a post we require to find all the comments associated with that post
    //One way could be to find all comments from the comment schema or
    //since we require to fetch the comments very frequently therefore we are instead putting the refrence of it in an array
    //include the array of ids of all comments in this post schema itselfs 
    comments:[
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},{
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;