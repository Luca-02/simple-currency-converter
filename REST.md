# REST API

## `/api/currency`

* ### GET

    - **Description**: Returns the list of all currencies by making an external API call.

    - **External API Call**: 
        ```
        https://api.freecurrencyapi.com/v1/currencies?apikey=[key]&currencies=
        ```

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

    - **Description**: Returns the list of latest exchange rates by making an external API call. The default base currency is USD.

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

## `/api/conversion`

* ### POST

    - **Description**: Given the from and to currency and the latest exchange rates, returns the currency conversion value.

    - **Parametri**: The request must have the header `Content-Type: application/json`.

    - **Body richiesta**: The code of the from and to currency, the amount you want to convert, and a JSON list of the latest exchange rates.
        ```
        {
            from: [string], 
            to: [string],
            amount: [float],
            exchange_rates: {
                [code]: [float],
                ...
            }
        }
        ```

    - **Response**: The code of the from and to currency, the amount you want to convert, and the converted amount.
        ```
        {
            from: [string], 
            to: [string],
            amount: [float],
            converted_amount [float]
        }
        ```

    - **Returned Status Codes**:
      * `200 OK`
      * `400 Bad Request`: Missing parameters.
      * `422 Unprocessable Entity`: Currencies not supported.