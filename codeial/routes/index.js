const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller')

console.log('ROUTER LOADED');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/feed',require('./post'));
router.use('/pro',require('./pro'));





module.exports = router;
 