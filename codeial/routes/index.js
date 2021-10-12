//Centrilzed file for all other routes
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('ROUTER LOADED');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

//let the index.js of router know there is another api folder
router.use('/api',require('./api'));
router.use('/likes',require('./likes'))

module.exports = router;
 

