function printSessionLog(id, dataName) {
    console.log(`Session [ ${id} ]: data '${dataName}' saved`);
}

async function handleCurrencyData(session, apiCall, endpoint) {
    if (!session.currency) {
        const data = await apiCall(endpoint);
        session.currency = data;
        session.save();
        printSessionLog(session.id, 'currency');
    }
    return session.currency;
}

async function handleExchangeRatesData(session, apiCall, endpoint) {
    if (!session.exchange_rates) {
        const data = await apiCall(endpoint);
        session.exchange_rates = data;
        session.save();
        printSessionLog(session.id, 'exchange_rates');
    }
    return session.exchange_rates;
}

module.exports =  { 
    handleCurrencyData,
    handleExchangeRatesData
};