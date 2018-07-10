const express = require('express');
const router = express.Router();
var {authenticate} = require('../middleware/authenticate');


var contactController  = require('../controllers/contact');

router.get('/',contactController.get_all);

router.post('/',contactController.insert);

router.patch('/:id' ,authenticate,contactController.edit );

router.delete('/:id' , authenticate ,contactController.delete);

module.exports = router;
