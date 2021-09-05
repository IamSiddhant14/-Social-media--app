
const Post = require('../models/post');
const User = require('../models/user');



module.exports.home = async function (req, res) {

// All the query that we make into the DB are asycronous that is no stoping action and the main 
// thread of the node.js server execute something else

//asyc await tell the server that this function contains some asyc task which it has to 
//look for and execute it frist then the next task
// then return it to the browser with the help of res.render


// #1
// Post.find({}).populate('comments').then(function());

// #2
//here exec is acting like an resolve function
//post.then contains the execustion of the this query
// let posts = Post.find({}).populate('comments').exec();

// posts.then()

// #3(below)


try{
    //await stopsit from being an async statement
    let posts = await Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

    let users = await User.find({});

    return res.render('home', {
        title: "Codeial | Home",
        posts: posts,
        all_users: users
    });
}catch(err){

    console.log('Error',err);
    return;

}


}



// **********************************\/*********************************//



// module.exports.home = function (req, res) {

    // Post.find({},function(err,posts){
    //     if(err){
    //         console.log("error found");
    //         return;
    //     }return res.render('home.ejs',{

    //         title:"CODEIAL | Home",
    //         posts: posts

    //     });
    // });
    //instead of fetch just the id of the user what if we fetch the entire user along with all of its feilds -->
    // we willl take the help of mongoose populate for this 
    //we could pre populate the refered object like user in this case
    // here we have populated each post's user with all of its feilds since we have the id of the user who created this post


    // Post.find({}).populate('user').exec(function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // })




    // when we neeed to populate multiple model that is get comment and the user of the comment 
    // here we will be populating two models one is comments and the user of the comment
//     Post.find({})
//         .populate('user')
//         .populate({
//             path: 'comments',
//             populate: {
//                 path: 'user'
//             }
//         })
//         //CALL BACK
//         .exec(function (err, posts) {

//             User.find({}, function (err, users) {//This function is the callback
//                 return res.render('home', {
//                     title: "Codeial | Home",
//                     posts: posts,
//                     all_users: users
//                 });
//             })


//         })

// }

