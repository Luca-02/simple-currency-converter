const session_controller = require('../controllers/sessionController')

const currency_endpoint = `https://api.freecurrencyapi.com/v1/currencies?apikey=${process.env.DEFAULT_KEY}&currencies=`;
const exchange_rates_endpoint = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.DEFAULT_KEY}&currencies=`;
const default_currency = 'USD';

async function callFreeCurrencyApiEndpoint(endpoint) {
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        // let data;
        // if (endpoint == currency_endpoint)
        //     data = await getCurrenciesTest();
        // if (endpoint == exchange_rates_endpoint)
        //     data = await getExchangeRatesTest();

        console.log("https://api.freecurrencyapi.com api call");

        if (data.error) {
            if (response.status === 401)
                return { code: 401, error: 'Invalid authentication credentials' };
            else if (response.status === 403)
                return { code: 403, error: 'You are not allowed to use this endpoint, please upgrade your plan.' };
            else if (response.status === 429)
                return { code: 429, error: 'You have hit your rate limit or your monthly limit. Please upgrade your plan.' };
            else
                return { code: response.status, error: 'Unknown error' };
        } else {
            return data.data;
        }
    } catch (error) {
        return { code: 500, error: 'Internal Server Error.' };
    }
}

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

async function convertCurrency(from, to, amount, exchange_rates) {
    if (!from || !to || !amount) {
        return { code: 400, error: 'Missing parameters.' };
    }

    if (!exchange_rates) {
        return { code: 400, error: 'Session data error.' };
    }

    if (!exchange_rates[from] || !exchange_rates[to]) {
        return { code: 400, error: 'Currencies not supported.' };
    }

    const converted_amount = (amount / exchange_rates[from]) * exchange_rates[to];
  
    return {
        from,
        to,
        amount, 
        converted_amount
    };
}

module.exports = {
    default_currency,
    getCurrencies,
    getExchangeRates,
    convertCurrency
};

/* - */

async function getCurrenciesTest() {
    return {
        data: {
            EUR: {
                symbol: "€",
                name: "Euro",
                symbol_native: "€",
                decimal_digits: 2,
                rounding: 0,
                code: "EUR",
                name_plural: "Euros"
            },
            USD: {
                symbol: "$",
                name: "US Dollar",
                symbol_native: "$",
                decimal_digits: 2,
                rounding: 0,
                code: "USD",
                name_plural: "US dollars"
            }
        }
    };
}

async function getExchangeRatesTest() {
    return {
        data: {
            USD: 1,
            EUR: 0.9279101316,            
        }
    };
}
