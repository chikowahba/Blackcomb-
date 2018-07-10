const express = require('express');
const router = express.Router();

var userController  = require('../controllers/user');

router.post('/signup',userController.signup);

router.post('/login', userController.login);

module.exports = router;
