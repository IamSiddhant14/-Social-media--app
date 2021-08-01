const express = require('express');
const router = express.Router();
const poscontroller = require('../controllers/pos_controller')

router.get('/',poscontroller.pos);


module.exports= router