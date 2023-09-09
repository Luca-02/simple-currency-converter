# REST API

## `/api/currency?code={code}`

* ### GET

    - **Description**: Returns the list of all currencies, otherwise it returns the currency where code is equal to the `code` passed as a parameter.

    - **External API Call**: 
        ```
        https://api.freecurrencyapi.com/v1/currencies?apikey=[key]&currencies=
        ```

    - **Parameters**: A parameter in the request query `code` which represents the currency code.

    - **Response**: Returns a JSON list of all currencies in the following format:
        ```
        {
            [code]: {
                "symbol": [string],
                "name":  [string],
                "symbol_native": [string],
                "decimal_digits": [integer],
                "rounding": [integer],
                "code": [string],
                "name_plural": [string]
            },
            ...
        }
        ```

    - **Returned Status Codes**:
      * `200 OK`
      * `400 Bad Request`: Invalid API key.
      * `401 Unauthorized`: Invalid authentication credentials.
      * `403 Forbidden`: Not allowed to use this endpoint.
      * `404 Not found`: A requested endpoint does not exist.
      * `422 Unprocessable Entity`: Validation error.
      * `429 Too Many Requests`: Rate limit or monthly limit reached.
      * `500 Internal Server Error`

## `/api/exchange_rates`

* ### GET

    - **Description**: Returns the list of latest exchange rates. The default base currency is USD.

    - **External API Call**: 
        ```
        https://api.freecurrencyapi.com/v1/latest?apikey=[key]&currencies=
        ```

    - **Response**: Returns a JSON list of all exchange rates in the following format:
        ```
        {
            [code]: [float],
            ...
        }
        ```

    - **Returned Status Codes**:
      * `200 OK`
      * `400 Bad Request`: Invalid API key.
      * `401 Unauthorized`: Invalid authentication credentials.
      * `403 Forbidden`: Not allowed to use this endpoint.
      * `404 Not found`: A requested endpoint does not exist.
      * `422 Unprocessable Entity`: Validation error.
      * `429 Too Many Requests`: Rate limit or monthly limit reached.
      * `500 Internal Server Error`

## `/api/conversion?from={from}&to={to}&amount={amount}`

* ### GET

    - **Description**: Given the from and to currency and amount, returns the currency conversion value.

    - **Parameters**: A parameter in the request query `from` which represents the currency to be converted, a `to` parameter which represents the currency to which it must be converted and finally `amount` which represents the amount of the value to be converted.

    - **Response**: The code of the from and to currency, the amount you want to convert, and the converted amount.
        ```
        {
            from: [string], 
            to: [string],
            amount: [float],
            converted_amount: [float]
        }
        ```

    - **Returned Status Codes**:
      * `200 OK`
      * `400 Bad Request`: Missing parameters or invalid API key.
      * `401 Unauthorized`: Invalid authentication credentials.
      * `403 Forbidden`: Not allowed to use this endpoint.
      * `404 Not found`: A requested endpoint does not exist.
      * `422 Unprocessable Entity`: Currencies not supported or validation error
      * `429 Too Many Requests`: Rate limit or monthly limit reached.
      * `500 Internal Server Error`