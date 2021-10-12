// const mongoose = require('mongoose');

// const likeSchema = new mongoose.Schema({
     
//     user:{
//         //The user who has made the like
//         type: mongoose.Schema.ObjectId 
//     },
//     //This defines the object id of the linked object
//     //Type(post,comment) and objectid (id of the post and comment) on which like is been made
//     likeable:{

//         type: mongoose.Schema.ObjectId,
//         required:true,
//         //This will be an dynamic refrence ,path to some other feild, on what type of object the like has been placed
//         refPath : 'onModel'

//     },
//     //This field is used for defining the type of the liked object since this is a dynamic refrence
//     onModel:{
//         type : String,
//         required: true,
//         //possible value of the likeable item
//         //restricting the like to this two models only
//         enum: ['Post','Comment']
//     }
// },{
//     timestamps: true
// });


// const Like = mongoose.model('Like',likeSchema);
// module.exports =Like;


const mongoose = require('mongoose');


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this defines the object id of the liked object
    likeable: {
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel'
    },
    // this field is used for defining the type of the liked object since this is a dynamic reference
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timestamps: true
});


const Like = mongoose.model('Like', likeSchema);
module.exports = Like;