const express = require('express');
const router = express.Router()

const postController = require('../controllers/')

router.get('/post',postController.post);

module.exports= router;