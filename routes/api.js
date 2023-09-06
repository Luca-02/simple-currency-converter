const express = require('express');
const api_controller = require('../controllers/apiController');

const router = express.Router();
router.get('/currency', api_controller.currency_api);
router.get('/exchange_rates', api_controller.exchange_rates_api);
router.post('/conversion', api_controller.convert_api);

module.exports = router;