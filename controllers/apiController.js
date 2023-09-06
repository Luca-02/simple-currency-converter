const currency_model = require('../models/currencyModel');

const currency_api = async (req, res) => {
    const data = await currency_model.getCurrencies(req.session);
    if (data.error)
        res.status(data.code).json(data);
    else
        res.json(data);
};

const exchange_rates_api = async (req, res) => {
    const data = await currency_model.getExchangeRates(req.session);
    if (data.error)
        res.status(data.code).json(data);
    else
        res.json(data);
};

const convert_api = async (req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    const amount = req.body.amount;
    const exchange_rates = req.body.exchange_rates;

    const data = await currency_model.convertCurrency(from, to, amount, exchange_rates);
    if (data.error)
        res.status(data.code).json(data);
    else
        res.json(data);
};

module.exports = {
    currency_api,
    exchange_rates_api,
    convert_api
};