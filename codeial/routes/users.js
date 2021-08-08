const express= require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller')

//This is described in the passport.js
router.get('/profile',passport.checkAuthentication,usersController.profile)
router.get('/signup',usersController.signup)
router.get('/signin',usersController.signin)
router.post('/create',usersController.create)
// used passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/signin'}
),usersController.createSession)
router.get('/signout',usersController.destroySession)



module.exports = router;
