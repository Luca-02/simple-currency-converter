const data_controller = require('../controllers/dataController');

const currency_api = async (req, res) => {
    const code = req.query.code;
    const data = await data_controller.getCurrencies(req.session);
    if (data.error) {
        res.status(data.code).json(data);
    } else {
        if (!code)
            res.json(data);
        else 
            res.json(data[code]);
    }
};

const exchange_rates_api = async (req, res) => {
    const data = await data_controller.getExchangeRates(req.session);
    if (data.error)
        res.status(data.code).json(data);
    else
        res.json(data);
};

const convert_api = async (req, res) => {
    const from = req.query.from;
    const to = req.query.to;
    const amount = req.query.amount;
    const exchange_rates = await data_controller.getExchangeRates(req.session);

    const data = await data_controller.convertCurrency(from, to, amount, exchange_rates);
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