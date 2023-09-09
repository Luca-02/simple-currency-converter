function printSessionLog(id, dataName) {
    console.log(`Session [ ${id} ]: data '${dataName}' saved`);
}

function printErrorLog(dataName, code, error) {
    console.log(`Error ${dataName} ${code}: ${error}`);
}

async function handleCurrencyData(session, apiCall, endpoint) {
    if (!session.currency) {
        const data = await apiCall(endpoint);
        if (!data.error) {
            session.currency = data;
            session.save();
            printSessionLog(session.id, 'currency');
        }
        else {
            printErrorLog('currency', data.code, data.error);
            return data;
        }
    }
    return session.currency;
}

async function handleExchangeRatesData(session, apiCall, endpoint) {
    if (!session.exchange_rates) {
        const data = await apiCall(endpoint);
        if (!data.error) {
            session.exchange_rates = data;
            session.save();
            printSessionLog(session.id, 'exchange_rates');
        }
        else {
            printErrorLog('exchange_rates', data.code, data.error);
            return data;
        }
    }
    return session.exchange_rates;
}

module.exports =  { 
    handleCurrencyData,
    handleExchangeRatesData
};