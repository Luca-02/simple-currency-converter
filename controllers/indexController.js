const currency_model = require('../models/currencyModel');
const data_controller = require('../controllers/dataController');

const hbs = require('../config/handlebars').hbs;

const index_view = async (req, res) => {
    if (!req.session.currency) {
        res.redirect('/error');
    } else {
        res.render('index', {
            currency: req.session.currency,
            default_currency_from: req.session.currency[currency_model.default_currency_code_from],
            default_currency_to: req.session.currency[currency_model.default_currency_code_to],
        });
    }
}

const error_view = async (req, res) => {
    const data = await data_controller.getCurrencies(req.session);
    if (data.error)
        res.render('error');
    else 
        res.redirect('/');
}

hbs.handlebars.registerHelper('isDefaultCurrencyFrom', function(value) {
    return currency_model.default_currency_code_from == value;
});

hbs.handlebars.registerHelper('isDefaultCurrencyTo', function(value) {
    return currency_model.default_currency_code_to == value;
});

hbs.handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

module.exports =  { 
    index_view,
    error_view
};