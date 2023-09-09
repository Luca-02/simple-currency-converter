const express = require('express');
const index_controller = require('../controllers/indexController');

const router = express.Router();
router.get('/', index_controller.index_view); 
router.get('/error', index_controller.error_view); 

module.exports = router;