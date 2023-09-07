const config = require('../config/config');
const session_controller = require('../controllers/sessionController');

const currency_endpoint = `https://api.freecurrencyapi.com/v1/currencies?apikey=${config.DEFAULT_KEY}&currencies=`;
const exchange_rates_endpoint = `https://api.freecurrencyapi.com/v1/latest?apikey=${config.DEFAULT_KEY}&currencies=`;

const currency_api = async (req, res) => {
    const data = await getCurrencies(req.session);
    if (data.error)
        res.status(data.code).json(data);
    else
        res.json(data);
};

const exchange_rates_api = async (req, res) => {
    const data = await getExchangeRates(req.session);
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

    const data = await convertCurrency(from, to, amount, exchange_rates);
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

/* - */ 

async function getCurrencies(session) {
    const data = await session_controller.handleCurrencyData(
        session, callFreeCurrencyApiEndpoint, currency_endpoint);
    return data;
}

async function getExchangeRates(session) {
    const data = await session_controller.handleExchangeRatesData(
        session, callFreeCurrencyApiEndpoint, exchange_rates_endpoint);
    return data;
}

async function callFreeCurrencyApiEndpoint(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        // let data;
        // if (endpoint == currency_endpoint)
        //     data = currency_model.getCurrenciesTest();
        // if (endpoint == exchange_rates_endpoint)
        //     data = currency_model.getExchangeRatesTest();

        console.log("https://api.freecurrencyapi.com api call");

        if (data.message) {
            return { code: 400, error: data.message };
        }
        if (data.error) {
            if (response.status === 401)
                return { code: 401, error: 'Invalid authentication credentials' };
            else if (response.status === 403)
                return { code: 403, error: 'You are not allowed to use this endpoint, please upgrade your plan' };
            else if (response.status === 429)
                return { code: 429, error: 'You have hit your rate limit or your monthly limit. Please upgrade your plan' };
            else
                return { code: response.status, error: 'Unknown error' };
        } else {
            return data.data;
        }
    } catch (error) {
        return { code: 500, error: 'Internal Server Error' };
    }
}

async function convertCurrency(from, to, amount, exchange_rates) {
    if (!from || !to || !amount) {
        return { code: 400, error: 'Missing parameters' };
    }

    if (!exchange_rates) {
        return { code: 400, error: 'Session data error' };
    }

    if (!exchange_rates[from] || !exchange_rates[to]) {
        return { code: 422, error: 'Currencies not supported' };
    }

    const converted_amount = (amount / exchange_rates[from]) * exchange_rates[to];
  
    return {
        from,
        to,
        amount, 
        converted_amount
    };
}