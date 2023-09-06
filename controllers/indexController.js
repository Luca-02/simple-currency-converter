const session_controller = require('../controllers/sessionController')
const currency_model = require('../models/currencyModel');
const hbs = require('../config/handlebars').hbs;

const HOST = process.env.HOST || 'http://localhost:';
const PORT = process.env.PORT || 3000;

const URL = `${HOST}${PORT}`;

async function fetchEndpointData(endpoint) {
    const request = await fetch(endpoint)
    const data = await request.json();
    return data;
}

const index_view = async (req, res) => {
    const currency = await session_controller.handleCurrencyData(
        req.session, fetchEndpointData, `${URL}/api/currency`);
    const exchange_rates = await session_controller.handleExchangeRatesData(
        req.session, fetchEndpointData, `${URL}/api/exchange_rates`);

    res.render('index', {
        style: 'index.css',
        currency,
        exchange_rates,
        default_currency: currency[currency_model.default_currency]
    });
}

hbs.handlebars.registerHelper('error', function(currency, exchange_rates) {
    return currency.error || exchange_rates.error;
});

hbs.handlebars.registerHelper('isDefaultCurrency', function(value) {
    return currency_model.default_currency == value;
});

hbs.handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

module.exports =  { 
    index_view
};