const express = require('express');
const router = express.Router();
const passport = require('passport');


const commentsController = require ('../controllers/comments_controller');
//                     This is used to check whether the user is authenticated or not 
 router.post('/create', passport.checkAuthentication,commentsController.create);
 router.get('/destroy/:id', passport.checkAuthentication,commentsController.destroy);


 module.exports = router;
