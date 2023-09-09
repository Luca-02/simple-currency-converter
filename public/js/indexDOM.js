const default_currency_from = document.getElementById('helper').getAttribute('default-currency-from');
const default_currency_to = document.getElementById('helper').getAttribute('default-currency-to');

$('#reset-btn').on('click', () => {
    reset();
});

$('#from').on('change', () => {
    changeCurrency($('#from'), $('#from-symbol-span'));
})

$('#to').on('change', () => {
    changeCurrency($('#to'), $('#to-symbol-span'));
});

$('#from-amount').on('keyup', () => {
    handleConvertCurrency($('#from'), $('#from-amount'), $('#to'), $('#to-amount'));
});

$('#to-amount').on('keyup', () => {
    handleConvertCurrency($('#to'), $('#to-amount'), $('#from'), $('#from-amount'));
});

function reset() {
    hideError();
    $('#from').val(default_currency_from);
    $('#from-amount').val(null);
    $('#to').val(default_currency_to);
    $('#to-amount').val(null);

    $('#from').trigger('change');
    $('#to').trigger('change');
}

function handleConvertCurrency(fromSelect, fromAmount, toSelect, toAmount) {
    const from = fromSelect.val();
    const to = toSelect.val();
    const amount = parseFloat(fromAmount.val());

    if (!isNaN(amount))
        executeConversion(toAmount, from, to, amount);
    else
        setToAmountDOM(toAmount, null);
}

function executeConversion(toAmount, from, to, amount) {
    fetch(`/api/conversion?from=${from}&to=${to}&amount=${amount}`)
        .then(response => response.json())
        .then(data => {
            if (data.error)
                showError();
            if (data.converted_amount)
                setToAmountDOM(toAmount, data.converted_amount);
        });
}

function changeCurrency(select, span) {
    fetch(`/api/currency?code=${select.val()}`)
        .then(response => response.json())
        .then(data => {
            if (data.error)
                showError();
            if (data.symbol_native)
                setCurrency(span, data.symbol_native);
        });
}

function setCurrency(span, symbol_native) {
    span.html(symbol_native);
    handleConvertCurrency($('#from'), $('#from-amount'), $('#to'), $('#to-amount'));
}

function setToAmountDOM(amountDOM, value) {
    hideError();
    amountDOM.val(value)
}

function showError() {
    $('#error-msg').show();
}


function hideError() {
    $('#error-msg').hide();
}
