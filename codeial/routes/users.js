const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller')

//This is described in the passport.js
router.get('/profile/:id', passport.checkAuthentication, usersController.profile)
router.post('/update/:id', passport.checkAuthentication, usersController.update)
router.get('/signup', usersController.signup)
router.get('/signin', usersController.signin)
router.post('/create', usersController.create)
// used passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    //STRATEGY USED
    'local',
    //WHAT TO DO ON FALIURE
    { failureRedirect: '/users/signin' }
), usersController.createSession)
router.get('/signout', usersController.destroySession)

//This route come in action when we click the button and we are taken to the google signin page(fetching the data from google)
//we will also be definig the scope of info that we could get from google 
//Since email is not a part of profile there for we need to get permission from google to get email also
router.get('/auth/google',passport.authenticate('google',{scope :['profile','email']}));
//This route is responsible when we have fetched the data from the google and sending it back to the call back URL
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/users/signin'}),usersController.createSession);


 

module.exports = router;
