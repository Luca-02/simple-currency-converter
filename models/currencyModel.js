const default_currency = 'USD';

function getCurrenciesTest() {
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

function getExchangeRatesTest() {
    return {
        data: {
            USD: 1,
            EUR: 0.9279101316,            
        }
    };
}

module.exports = {
    default_currency,
    getCurrenciesTest,
    getExchangeRatesTest
};